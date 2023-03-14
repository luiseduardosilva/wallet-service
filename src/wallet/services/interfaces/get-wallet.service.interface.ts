import { HttpStatus } from '@nestjs/common';
import { WalletSchema } from '../../models';

export type GetWalletProps = {
    id: number;
};

export type GetWalletResponse = {
    data: WalletSchema | string;
    statusCode: HttpStatus;
};

export interface IGetWalletService {
    execute(porps: GetWalletProps): Promise<GetWalletResponse>;
}
