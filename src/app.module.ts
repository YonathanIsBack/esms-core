import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseConnection from './config/DatabaseConnection';
import { CustomerModule } from './customer/customer.module';
import { ServiceTransactionModule } from './servicetransaction/serviceTransaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConnection,
    CustomerModule,
    ServiceTransactionModule,
    UserModule,
  ],
})
export class AppModule {}
