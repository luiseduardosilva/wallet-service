import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class CreateWalletDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string;
}
