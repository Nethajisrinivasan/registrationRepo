import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signup } from './entities/signup.entity';
import { MailerService } from 'src/mail.service';


@Module({
  imports: [TypeOrmModule.forFeature([Signup])],
  controllers: [SignupController],
  providers: [SignupService,MailerService]
})
export class SignupModule {}
