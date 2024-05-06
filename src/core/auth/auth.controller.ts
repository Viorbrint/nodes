import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/metadata/public.decorator';
import { AccessToken } from './entities/access-token.entity';
import { LoginDto } from './entities/login.dto';
import { GetUser } from 'src/common/decorators/requests/get-user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { localAuthGuard } from './guards/local-auth.guard';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: AccessToken, description: 'Jwt access token' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @UseGuards(localAuthGuard)
  @Post('login')
  async login(@Body() _: LoginDto, @GetUser() user: AuthUser) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiCreatedResponse({ type: AccessToken, description: 'Jwt access token' })
  @ApiBadRequestResponse({ description: 'Email is already in use.' })
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
