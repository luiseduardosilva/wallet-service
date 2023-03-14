import { DatabaseException } from '../../../exceptions';
import { WalletSchema } from '../../models';

export type UpdateBalanceProps = {
    walletId: number;
    value: number;
};

export type CreateWalletProps = {
    name: string;
};

export type GetWalletProps = {
    id: number;
};

export interface IWalletRepository {
    updateBalance(
        props: UpdateBalanceProps,
    ): Promise<boolean | DatabaseException>;
    create(props: CreateWalletProps): Promise<WalletSchema | DatabaseException>;
    findById(props: GetWalletProps): Promise<WalletSchema>;
}

export const IWalletRepository = Symbol('IWalletRepository');
