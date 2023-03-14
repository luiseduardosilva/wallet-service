import { IsNumberString } from 'class-validator';

export class WalletIdValidator {
    @IsNumberString()
    id: number;
}
