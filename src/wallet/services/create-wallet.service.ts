import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
    CreateWalletProps,
    CreateWalletResponse,
    ICreateWalletService,
} from './interfaces';
import { IWalletRepository } from '../repositories/interfaces';
import { DatabaseException, InvalidWalletException } from '../../exceptions';
@Injectable()
export class CreateWalletService implements ICreateWalletService {
    constructor(
        @Inject(IWalletRepository)
        private readonly repository: IWalletRepository,
    ) {}

    async execute(props: CreateWalletProps): Promise<CreateWalletResponse> {
        const { name } = props;

        const wallet = await this.save({ name });
        return this.response(wallet);
    }

    async save(
        props: CreateWalletProps,
    ): Promise<boolean | InvalidWalletException | DatabaseException> {
        const { name } = props;

        try {
            const wallet = await this.repository.create({ name });

            if (wallet instanceof DatabaseException) {
                throw wallet;
            }

            if (!wallet) {
                throw new InvalidWalletException({
                    message: 'Erro to create wallet',
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                });
            }

            return true;
        } catch (error) {
            return error;
        }
    }

    private response(data: any): {
        data: string;
        statusCode: number;
    } {
        if (
            data instanceof InvalidWalletException ||
            data instanceof DatabaseException
        ) {
            return {
                data: data.message,
                statusCode: data?.statusCode,
            };
        }

        if (data instanceof Error) {
            return {
                data: 'Error to create wallet',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }

        return {
            data: 'Wallet created',
            statusCode: HttpStatus.CREATED,
        };
    }
}
