import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InvalidWalletException } from '../../exceptions';
import { ILoggerWrapper, LoggerWrapper } from '../../wrappers';
import { WalletSchema } from '../models';
import { IWalletRepository } from '../repositories/interfaces';
import {
    GetWalletProps,
    GetWalletResponse,
    IGetWalletService,
} from './interfaces';

@Injectable()
export class GetWalletService implements IGetWalletService {
    constructor(
        @Inject(IWalletRepository)
        private readonly repository: IWalletRepository,
        @Inject(ILoggerWrapper)
        private readonly loggerWrapper: LoggerWrapper,
    ) {}

    async execute(props: GetWalletProps): Promise<GetWalletResponse> {
        const { id } = props;

        const wallet = await this.getWallet({ id });

        return this.response(wallet);
    }

    private async getWallet(props: GetWalletProps) {
        try {
            const { id } = props;
            const wallet = await this.repository.findById({ id });

            if (!wallet) {
                throw new InvalidWalletException({
                    message: 'Invalid walletId',
                    statusCode: HttpStatus.NOT_FOUND,
                });
            }

            return wallet;
        } catch (error) {
            await this.loggerWrapper.execute({
                message: 'Error to get Wallet',
                error,
            });
            return error;
        }
    }

    private response(data: any): {
        data: WalletSchema | string;
        statusCode: number;
    } {
        if (data instanceof InvalidWalletException) {
            return {
                data: data.message,
                statusCode: data.statusCode,
            };
        }

        if (data instanceof Error) {
            return {
                data: 'Error to update wallet',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }

        return {
            data: data,
            statusCode: HttpStatus.OK,
        };
    }
}
