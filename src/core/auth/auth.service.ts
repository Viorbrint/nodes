import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUser } from 'src/common/interfaces/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      //eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration({ password, email }: CreateUserDto) {
    const exists = await this.usersService.findOneByEmail(email);
    if (exists) {
      throw new BadRequestException(`Email '${email}' is already in use.`);
    }
    //eslint-disable-next-line
    const user = await this.usersService.create({
      password: await bcrypt.hash(password, 10),
      email,
    });
    return this.login(user);
  }
}
