import { Injectable } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signup } from './entities/signup.entity';

@Injectable()
export class SignupService {

  constructor(
    @InjectRepository(Signup)
    private signupRepo : Repository<Signup>,
  ) {}




  async checkEmail(email: string) {
  return await this.signupRepo.findOne({where: {email:email},
    select: ['id','email','password','isVerified','verification_code','logincount','attemptime']}) ;
  }

async storeUser(createSignupDto: CreateSignupDto) {
  console.log("i am in store user");
  
  return await this.signupRepo.save(createSignupDto);
}

updateVerificationCode(id: number, createUserDto: any) {
  console.log("i am in update verification code",createUserDto);
  
  return this.signupRepo.update(id,createUserDto);

}



  create(createSignupDto: CreateSignupDto) {
    return 'This action adds a new signup';
  }

  findAll() {
    return `This action returns all signup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signup`;
  }

  update(id: number, updateSignupDto: any) {
    // return `This action updates a #${id} signup`;
    //update isVerified column to true
    console.log("i am in update");
    return this.signupRepo.update(id,updateSignupDto);

  }

  //Update login count
  updateLoginCount(id: number, updateSignupDto: any) {
    console.log("i am in update login count",id,updateSignupDto);
    return this.signupRepo.update(id,updateSignupDto);
  }
  //Update attempt time
  async updateAttemptTime(id: number, attemptime: any) {
    console.log("i am in update attempt time",id,attemptime);
    let data = await this.signupRepo.update(id,{
      attemptime: attemptime.attemptime,
    }).catch((err)=>{
      console.log("error is",err);
    })
    console.log("data is",data);
    return data;
    
  }


  remove(id: number) {
    return `This action removes a #${id} signup`;
  }
}
