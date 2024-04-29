import { Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { localAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @UseGuards(localAuthGuard)
  @Post('login')
  async login(@GetUser() user) {
    return this.authService.login(user);
  }
}
