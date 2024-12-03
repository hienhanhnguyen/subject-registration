import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthInput } from './dto/authDTO';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async validateUser(input: AuthInput): Promise<any> {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { ma_nguoi_dung: input.username },
    });

    if (user && user.password === input.password) {
      //   const payload = { username: user.username, sub: user.id };
      const access_token = await this.signToken(user.ma_nguoi_dung);
      console.log(access_token);
      return { access_token: access_token, username: user.ma_nguoi_dung };
    }
    return null;
  }

  async createUser(data: AuthInput): Promise<any> {
    // return this.prisma.nguoi_dung.create({
    //   data: {
    //     ma_nguoi_dung: data.username,
    //     password: data.password,
    //   },
    // });
  }
  async signToken(username: number): Promise<string> {
    const payload = { username: username }; //sub: a convention for the subject of the token
    const secret = this.config.get('JWT_SECRET');
    console.log(secret);
    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '1h',
    }); //signAsync because it easier to catch error
    console.log(token);
    return token; // return an object
  }
}
