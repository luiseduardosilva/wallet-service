import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { WalletRepository } from './repositories/wallet.repository';
import { CreateWalletService } from './services/create-wallet.service';

import { IWalletRepository } from './repositories/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModel } from './models';
import { UpdateWalletBalanceService } from './services/update-wallet-value.service';
import { GetWalletService } from './services/get-wallet.service';
import { ILoggerWrapper, LoggerWrapper } from '../wrappers';
@Module({
    imports: [TypeOrmModule.forFeature([WalletModel])],
    controllers: [WalletController],
    providers: [
        {
            useClass: WalletRepository,
            provide: IWalletRepository,
        },
        {
            useClass: LoggerWrapper,
            provide: ILoggerWrapper,
        },
        CreateWalletService,
        UpdateWalletBalanceService,
        GetWalletService,
    ],
})
export class WalletModule {}
