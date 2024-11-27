import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  Customer,
  CustomerDocument,
} from '../customers/schema/customer.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private jwtService: JwtService,
  ) {}

  // Register a new customer

  async register(dto: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const customer = new this.customerModel({
      ...dto,
      password: hashedPassword,
    });
    const savedCustomer = await customer.save();

    const payload = {
      email: customer.email,
      sub: customer._id,
      role: customer.role,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Success',
      customer: {
        ...savedCustomer.toObject(),
        password: undefined, // Exclude password in the response
      },
      userId: savedCustomer._id,
      accessToken,
    };
  }

  // Login a customer
  async login(email: string, password: string): Promise<object> {
    const customer = await this.customerModel
      .findOne({ email })
      .select('+password'); // Get the password field
    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Directly compare the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: customer.email,
      sub: customer._id,
      role: customer.role,
    };

    return {
      message: 'Login successful',
      userId: customer._id, // Include userId here
      accessToken: this.jwtService.sign(payload),
      user: customer,
    };
  }
}
