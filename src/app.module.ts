import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configs/typeorm.config';
import { LoggerWrapper } from './wrappers';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        WalletModule,
    ],
    controllers: [],
    providers: [LoggerWrapper],
})
export class AppModule {}
