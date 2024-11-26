import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase, PurchaseDocument } from './schema/purchase.schema';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
  ) {}

  async purchaseFilm(customerId: string, filmId: string, price: number) {
    const purchase = new this.purchaseModel({
      customerId,
      filmId,
      price,
      purchaseDate: new Date(),
    });
    return await purchase.save();
  }

  async getCustomerPurchases(customerId: string) {
    return await this.purchaseModel
      .find({ customerId })
      .populate('filmId') // Populate film details
      .exec();
  }
}
