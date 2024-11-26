import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PurchaseService } from './purchases.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post(':filmId')
  async purchaseFilm(
    @Param('filmId') filmId: string,
    @Body('customerId') customerId: string,
    @Body('price') price: number,
  ) {
    return await this.purchaseService.purchaseFilm(customerId, filmId, price);
  }

  @Get(':customerId')
  async getCustomerPurchases(@Param('customerId') customerId: string) {
    return await this.purchaseService.getCustomerPurchases(customerId);
  }
}
