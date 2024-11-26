import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Purchase, PurchaseSchema } from './schema/purchase.schema';
import { PurchaseController } from './purchases.controller';
import { PurchaseService } from './purchases.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Purchase.name, schema: PurchaseSchema },
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchasesModule {}
