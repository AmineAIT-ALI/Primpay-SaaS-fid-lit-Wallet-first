import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.staffUser.findUnique({
      where: { email: dto.email },
      include: { merchant: { select: { id: true, status: true } } },
    });

    if (!user || user.status === 'DISABLED') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.merchant.status === 'SUSPENDED') {
      throw new UnauthorizedException('Account suspended');
    }

    return this.issueTokens({
      sub: user.id,
      email: user.email,
      merchantId: user.merchantId,
      role: user.role,
    });
  }

  async refresh(payload: JwtPayload) {
    // Re-fetch to ensure user still active
    const user = await this.prisma.staffUser.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.status === 'DISABLED') {
      throw new UnauthorizedException();
    }

    return this.issueTokens({
      sub: user.id,
      email: user.email,
      merchantId: user.merchantId,
      role: user.role,
    });
  }

  private issueTokens(payload: JwtPayload) {
    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN') ?? '15m',
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') ?? '7d',
    });

    return { accessToken, refreshToken };
  }
}
