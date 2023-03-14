import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseException } from '../../exceptions';
import { ILoggerWrapper } from '../../wrappers';
import { WalletModel, WalletSchema } from '../models';
import {
    CreateWalletProps,
    GetWalletProps,
    IWalletRepository,
    UpdateBalanceProps,
} from './interfaces';
@Injectable()
export class WalletRepository implements IWalletRepository {
    @InjectRepository(WalletModel)
    private readonly repository: Repository<WalletModel>;
    constructor(
        @Inject(ILoggerWrapper)
        private readonly loggerWrapper: ILoggerWrapper,
    ) {}
    async updateBalance(props: UpdateBalanceProps): Promise<boolean> {
        const { value, walletId } = props;

        try {
            const update = await this.repository.update(
                { id: walletId },
                {
                    balance: value,
                },
            );

            if (!update) {
                throw new DatabaseException();
            }
            return true;
        } catch (error) {
            await this.loggerWrapper.execute({
                message: `Error to update wallet in database, balanceId: ${walletId}, Value: ${value}`,
                error,
            });
            return error;
        }
    }

    async create(
        props: CreateWalletProps,
    ): Promise<WalletSchema | DatabaseException> {
        const { name } = props;

        try {
            const wallet = await this.repository.save({
                name,
                balance: 0,
            });

            if (!wallet) {
                throw new DatabaseException();
            }

            return wallet;
        } catch (error) {
            await this.loggerWrapper.execute({
                message: `Error to save wallet in database`,
                error,
            });
            throw error;
        }
    }

    async findById(props: GetWalletProps): Promise<WalletSchema> {
        const { id } = props;

        try {
            const wallet = await this.repository.findOne({
                where: { id },
            });

            return wallet;
        } catch (error) {
            await this.loggerWrapper.execute({
                message: `Error to get wallet in database`,
                error,
            });
            throw error;
        }
    }
}
