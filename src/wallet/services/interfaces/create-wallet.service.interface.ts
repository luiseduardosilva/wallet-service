import { HttpStatus } from '@nestjs/common';

export type CreateWalletResponse = {
    data: string;
    statusCode: HttpStatus;
};

export type CreateWalletProps = {
    name: string;
};

export interface ICreateWalletService {
    execute(props: CreateWalletProps): Promise<CreateWalletResponse>;
}

export const ICreateWalletService = Symbol('ICreateWalletService');
