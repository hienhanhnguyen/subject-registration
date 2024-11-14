import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('abcs') {
  constructor() {
    super();
  }
}
