import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
  ) { }

  private determineRole(ma_nguoi_dung: number): string {
    const ma_nguoi_dung_str = ma_nguoi_dung.toString();
    console.log(ma_nguoi_dung_str);
    if (ma_nguoi_dung_str.length === 7) {
      return 'student';
    } else if (ma_nguoi_dung_str.startsWith('99')) {
      return 'admin';
    }
    return 'unknown';
  }

  async validateUser(input: AuthInput): Promise<any> {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: { email: input.email },
    });

    if (user && user.password === input.password) {
      const userRole = this.determineRole(user.ma_nguoi_dung);
      if (userRole == 'unknown') {
        throw new ForbiddenException('This site is not intended for this user');
      }
      //   const payload = { username: user.username, sub: user.id };
      const access_token = await this.signToken(user.ma_nguoi_dung, userRole);
      console.log(access_token);
      return { access_token: access_token };
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
  async signToken(username: number, role: string): Promise<string> {
    const payload = { username: username, role: role }; //sub: a convention for the subject of the token
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
