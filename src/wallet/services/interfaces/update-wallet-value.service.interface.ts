import { HttpStatus } from '@nestjs/common';

export type UpdateWalletResponse = {
    data: string;
    statusCode: HttpStatus;
};

export type UpdateWalletBalanceProps = {
    walletId: number;
    value: number;
};

export interface IUpdateWalletService {
    execute(props: UpdateWalletBalanceProps): Promise<UpdateWalletResponse>;
}

export const IUpdateWalletService = Symbol('IUpdateWalletService');
