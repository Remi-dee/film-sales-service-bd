import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { FilmsModule } from './films/films.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Path to the .env file
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CustomersModule,
    FilmsModule,
    PurchasesModule,
  ],
})
export class AppModule {}
