import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { localAuthGuard } from './guards/local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { AccessToken } from './entities/access-token.entity';
import { LoginDto } from './entities/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: AccessToken, description: 'Jwt access token' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @UseGuards(localAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() _: LoginDto, @GetUser() user) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiCreatedResponse({ type: AccessToken, description: 'Jwt access token' })
  @ApiBadRequestResponse({ description: 'Email is already in use.' })
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
