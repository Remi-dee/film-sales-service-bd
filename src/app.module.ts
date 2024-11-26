import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { FilmsModule } from './films/films.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CustomersModule,
    FilmsModule,
    PurchasesModule,
  ],
})
export class AppModule {}
