import { Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { localAuthGuard } from './guards/local-auth-guard.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: 'Login' })
  @UseGuards(localAuthGuard)
  @Post('login')
  async login(@GetUser() user) {
    return user;
  }
}
