import {
    Controller,
    Post,
    Body,
    Put,
    Param,
    Res,
    Get,
    HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletBalanceDto } from '../dto/update-wallet-balance.dto';
import { CreateWalletService } from '../services/create-wallet.service';
import { GetWalletService } from '../services/get-wallet.service';

import { UpdateWalletBalanceService } from '../services/update-wallet-value.service';
import { WalletIdValidator } from '../validators/wallet-param-id.validator';

const API_VERSION = 'v1';

@Controller(`api/${API_VERSION}/wallets`)
@ApiTags('wallets')
export class WalletController {
    constructor(
        private readonly createWalletService: CreateWalletService,
        private readonly updateWalletBalanceService: UpdateWalletBalanceService,
        private readonly getWalletBalanceService: GetWalletService,
    ) {}
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            default: {
                data: 'Wallet created',
                statusCode: HttpStatus.CREATED,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        schema: {
            default: {
                data: 'Error message',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        schema: {
            default: {
                data: 'message',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
        },
    })
    @ApiBody({
        schema: {
            example: {
                name: 'Test',
            },
        },
    })
    @Post()
    async create(@Res() res, @Body() dto: CreateWalletDto) {
        const wallet = await this.createWalletService.execute(dto);

        return res.status(wallet.statusCode).json(wallet);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            default: {
                data: 'Balance is changed',
                statusCode: HttpStatus.OK,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        schema: {
            default: {
                data: 'Error message',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        schema: {
            default: {
                data: 'message',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
        },
    })
    @ApiBody({
        schema: {
            example: {
                value: -40,
            },
        },
    })
    @Put(':id')
    async updateWalletBalance(
        @Res() res,
        @Param() params: WalletIdValidator,
        @Body() dto: UpdateWalletBalanceDto,
    ) {
        const { id } = params;
        const wallet = await this.updateWalletBalanceService.execute({
            ...dto,
            walletId: id,
        });

        return res.status(wallet.statusCode).json(wallet);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            default: {
                data: {
                    id: 1,
                    balance: 11417,
                    name: 'Luis',
                    createdAt: '2023-03-07T01:18:40.636Z',
                    updatedAt: '2023-03-13T19:33:53.446Z',
                },
                statusCode: 200,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        schema: {
            default: {
                data: 'Error message',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        schema: {
            default: {
                data: 'message',
                statusCode: HttpStatus.NOT_FOUND,
            },
        },
    })
    @Get(':id')
    async getWalletBalance(@Res() res, @Param() params: WalletIdValidator) {
        const { id } = params;

        const wallet = await this.getWalletBalanceService.execute({
            id: id,
        });

        return res.status(wallet.statusCode).json(wallet);
    }
}
