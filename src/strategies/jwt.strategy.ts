import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Customer,
  CustomerDocument,
} from 'src/customers/schema/customer.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Use environment variable in production
    });
  }

  async validate(payload: any) {
    const { sub: userId } = payload; // Extract the userId from the token payload

    // Fetch the user from the database using the userId
    const user = await this.customerModel.findById(userId).select('-password'); // Don't return the password

    if (!user) {
      throw new UnauthorizedException('User not found'); // Throw exception if user is not found
    }

    return user; // Return the full user object
  }
}
