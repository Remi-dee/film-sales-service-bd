import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    // Ensure users can only access their own data

    return this.customersService.getCustomerById(id);
  }

  @Patch(':id')
  async updateCustomer(@Param('id') id: string, @Body() updates: any) {
    // Ensure users can only update their own data

    return this.customersService.updateCustomer(id, updates);
  }
}
