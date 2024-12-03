import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'abcs') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { username: number }) {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: {
        ma_nguoi_dung: payload.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    delete user.password;
    return user; // This part appends the user to the request object
  }
}
