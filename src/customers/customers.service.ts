import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schema/customer.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async getCustomerById(id: string): Promise<Customer> {
    console.log('our user', id);
    const customer = await this.customerModel.findById(id).select('-password');
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<any> {
    // Hash the password if it is being updated
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, updates, { new: true })
      .select('-password'); // Exclude password from response

    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    return updatedCustomer;
  }
}
