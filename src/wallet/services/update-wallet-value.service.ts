import { HttpStatus, Inject } from '@nestjs/common';
import { InvalidWalletException } from '../../exceptions';
import { DatabaseException } from '../../exceptions/database.exception';
import { LoggerWrapper, ILoggerWrapper } from '../../wrappers';
import { IWalletRepository } from '../repositories/interfaces';
import {
    IUpdateWalletService,
    UpdateWalletBalanceProps,
    UpdateWalletResponse,
} from './interfaces';

export class UpdateWalletBalanceService implements IUpdateWalletService {
    constructor(
        @Inject(IWalletRepository)
        private readonly repository: IWalletRepository,
        @Inject(ILoggerWrapper)
        private readonly loggerWrapper: LoggerWrapper,
    ) {}

    async execute(
        props: UpdateWalletBalanceProps,
    ): Promise<UpdateWalletResponse> {
        try {
            const { value, walletId } = props;

            const update = await this.update({ value, walletId });

            return this.response(update);
        } catch (error) {
            await this.loggerWrapper.execute({
                message: 'Error to update Wallet',
                error,
            });
            return error;
        }
    }

    async update(
        props: UpdateWalletBalanceProps,
    ): Promise<boolean | Error | DatabaseException> {
        try {
            const { value, walletId } = props;

            const wallet = await this.repository.findById({ id: walletId });

            if (!wallet) {
                throw new InvalidWalletException({
                    message: `Invalid WalletId`,
                    statusCode: HttpStatus.NOT_FOUND,
                });
            }

            const changeValue = value + wallet.balance;

            const walletUpdated = await this.repository.updateBalance({
                value: changeValue,
                walletId,
            });

            if (walletUpdated instanceof DatabaseException) {
                throw walletUpdated;
            }

            if (!walletUpdated) {
                throw new DatabaseException();
            }

            return true;
        } catch (error) {
            await this.loggerWrapper.execute({
                message: 'Error to update Wallet',
                error,
            });
            return error;
        }
    }

    private response(data: any): { data: string; statusCode: HttpStatus } {
        if (
            data instanceof InvalidWalletException ||
            data instanceof DatabaseException
        ) {
            return {
                data: data.message,
                statusCode: data.statusCode,
            };
        }

        if (data instanceof Error) {
            return {
                data: 'Internal server error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }

        return {
            data: 'Balance is changed',
            statusCode: HttpStatus.OK,
        };
    }
}
