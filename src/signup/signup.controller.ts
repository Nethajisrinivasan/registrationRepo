import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mail.service';

@Controller('signup')
export class SignupController {
  // genverificationCode: string;
  sendemail: string;
  constructor(
    private readonly signupService: SignupService,
    private mail: MailerService,
  ) {}

  @Post('signup')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createSignupDto: any,
  ) {
    try {
      let name = createSignupDto.name;
      let email = createSignupDto.email;
      let password = createSignupDto.password;

      console.log(createSignupDto);
      const ckeckemail = await this.signupService.checkEmail(
        createSignupDto.email,
      );

      if (ckeckemail) {
        if (ckeckemail.isVerified == true)
          return res.status(400).send({
            message: 'Email already exists',
          });

        if (ckeckemail.isVerified == false) {
          return res.status(400).send({
            message: 'Email is not verified',
          });
        } else {
          const verifyCode = this.mail.generateVerificationCode();
          await this.signupService.updateVerificationCode(ckeckemail.id, {
            verification_code: verifyCode,
          });
          await this.mail.sendMail(
            email,
            'Verify Email',
            `Please verify your email ${verifyCode}`,
          );
          console.log('Email sent');
          return res.status(HttpStatus.OK).json({
            message: 'Email not verified',
            result: 'verifyCode send Your Email',
          });
        }
      } else {
        const saltRounds = 10;
        createSignupDto.password = await bcrypt.hash(password, saltRounds);
        console.log(createSignupDto.password);

        const verifyCode = this.mail.generateVerificationCode();
        console.log(verifyCode);
        await this.signupService.storeUser(createSignupDto);
        // await this.signupService.updateVerificationCode(ckeckemail.id, { verification_code: verifyCode });
        await this.mail.sendMail(
          email,
          'Verify Email',
          `Please verify your email ${verifyCode}`,
        );
        console.log('Email sent');

        return res.status(HttpStatus.OK).json({
          message: 'Email not verified',
          result: 'verifyCode send Your Email',
        });
      }
    } catch (e) {}
  }
  @Post('verify')
  async verify(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    console.log('INSIDE VERIFY');

    try {
      const { email, verification_code } = body;
      const user = await this.signupService.checkEmail(email);
      if (user) {
        if (user.isVerified == true) {
          return res.status(400).send({
            message: 'Email already verified',
          });
        } else if (user.verification_code == verification_code) {
          await this.signupService.update(user.id, {
            isVerified: true,
            verification_code: null,
          });
          return res.status(200).send({
            message: 'Email verified successfully',
          });
        } else {
          return res.status(400).send({
            message: 'Invalid verification code',
          });
        }
      } else {
        return res.status(400).send({
          message: 'Invalid email',
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Internal server error',
      });
    }
  }
  //login
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    console.log('INSIDE LOGIN');

    try {
      let email = body.email;
      let password = body.password;

      const user = await this.signupService.checkEmail(email);

      console.log('userData is ', user);

      if (user) {
        if (user.isVerified == false) {
          if (user.logincount > 3) {
            return res.status(400).send({
              message: 'Email is not verified',
            });
          }
        } else {
          const currenttime = Date.now();
          const maxtime = 120000;
          console.log(currenttime);

          if (currenttime - +user.attemptime > maxtime) {
            //update attemtime to null in database
            await this.signupService.updateAttemptTime(user.id, {
              attemptime: 0,
            });

            const match = await bcrypt.compare(password, user.password);
            if (match) {
              //update login count to 0
              await this.signupService.updateLoginCount(user.id, {
                logincount: 0,
              });

              return res.status(200).send({
                message: 'Login successful',
                msg: true,
              });
            } else {
              if (user.logincount < 4) {
                //UPDATE LOGIN COUNT
                const logincount = user.logincount + 1;
                console.log(logincount);

                await this.signupService.updateLoginCount(user.id, {
                  logincount: logincount,
                });
              } else {
                const time = String(Date.now());
                console.log('timeeeeeeeeeee', time);

                //update attempt time in database
                await this.signupService.updateAttemptTime(user.id, {
                  attemptime: time,
                });

                // console.log(attemptime);
              }

              return res.status(400).send({
                message: 'Invalid password',
              });
            }
          } else {
            return res.status(400).send({
              message: 'Please wait for 2 minutes',
            });
          }
        }
      } else {
        return res.status(400).send({
          message: 'Invalid email',
        });
      }
    } catch (e) {
      console.log(e, 'error');
      return res.status(500).send({
        message: 'Internal server error',
      });
    }
  }

  @Get()
  findAll() {
    return this.signupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignupDto: UpdateSignupDto) {
    return this.signupService.update(+id, updateSignupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signupService.remove(+id);
  }

  @Post('forgotpassword')
  async forgotpassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
  ) {
    console.log('inside forgot password');
    try {
      const email = body.email;
      const user = await this.signupService.checkEmail(email);
      if (user) {
        if (user.isVerified == true) {
          const verifyCode = this.mail.generateVerificationCode();
          const genertedtime = Date.now();
          //generate verification code and update in database
          await this.signupService.updateVerificationCode(user.id, {
            verification_code: verifyCode,
          });
          //generate generate time and updated in  database
          await this.signupService.update(user.id, {
            attemptime: genertedtime,
          });

          await this.mail.sendMail(
            email,
            'Verify Email',
            `Please verify your email ${verifyCode}`,
          );
          console.log('Email sent');

          return res.status(HttpStatus.OK).json({
            message: 'A verification code has been sent to your email',
            msg: true,
          });
        } else {
          return res.status(400).send({
            message: 'Email is not verified',
          });
        }
      } else {
        return res.status(400).send({
          message: 'Invalid email',
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Internal server error',
      });
    }
  }

  //reset password
  @Post('resetpassword')
  async resetpassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
  ) {
    console.log('INSIDE RESET PASSWORD');
    try {
      const { email, otp } = body;
      const user = await this.signupService.checkEmail(email);
      const currentime = Date.now();
      const limitedtime = 120000;
      console.log("user body is ",user)
      console.log("email is ", email)
      console.log("veridication code is ",otp)
      if (user) {
        if (user.isVerified == true) {
          if (currentime - +user.attemptime < limitedtime) {
            if (user.verification_code == otp) {
              console.log('user.verificatio_code', user.verification_code)
              console.log('verification_code', otp)
              // const saltRounds = 10;
              // const hash = await bcrypt.hash(password, saltRounds);
              // await this.signupService.update(user.id, {
              //   password: hash,
              //   verification_code: null,
              // });
              return res.status(200).send({
                message: 'Password reset successfully',
              });
            } else {
              return res.status(400).send({
                message: 'Invalid verification code',
              });
            }
            
          }else{
            return res.status(400).send({
              message: 'Time limit exceed',
            });
          } 
        }else{
          return res.status(400).send({
            message: 'Email is not verified',
          });
        }
      } else {
        return res.status(400).send({
          message: 'Invalid email',
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Internal server error',
      });
    }
  }
}
