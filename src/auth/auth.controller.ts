import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    schema: {
      example: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        dateOfBirth: '2000-01-01',
        address: '123 Street',
      },
    },
  })
  async register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({
    schema: { example: { email: 'john@example.com', password: 'password' } },
  })
  async login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto.email, dto.password);
  }
}
