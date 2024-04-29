import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { localAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @UseGuards(localAuthGuard)
  @Public()
  @Post('login')
  async login(@GetUser() user) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Registration' })
  @Public()
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.registration(createUserDto);
    } catch (error) {
      throw new BadRequestException(
        `Email '${createUserDto.email}' is already in use.`,
      );
    }
  }
}
