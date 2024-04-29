import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
