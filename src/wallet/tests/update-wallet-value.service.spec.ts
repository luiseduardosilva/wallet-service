import { Test, TestingModule } from '@nestjs/testing';

import {
    IGetWalletService,
    IUpdateWalletService,
} from '../services/interfaces';
import { IWalletRepository } from '../repositories/interfaces';
import { UpdateWalletBalanceService } from '../services/update-wallet-value.service';
import { ILoggerWrapper } from '../../wrappers';
import { DatabaseException, InvalidWalletException } from '../../exceptions';
import { GetWalletService } from '../services/get-wallet.service';

const mockWallet = {
    id: 1,
    balance: 100,
    name: 'Luis',
    createdAt: '2023-03-07T01:18:40.636Z',
    updatedAt: '2023-03-13T22:59:24.422Z',
};

describe('UpdateWalletService', () => {
    let service: IGetWalletService;
    let walletRepository: IWalletRepository;
    let loggerWrapper: ILoggerWrapper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetWalletService,
                {
                    provide: IWalletRepository,
                    useValue: {
                        findById: jest.fn().mockResolvedValue(mockWallet),
                    },
                },
                {
                    provide: ILoggerWrapper,
                    useValue: {
                        execute: jest.fn().mockResolvedValue({}),
                    },
                },
            ],
        }).compile();

        service = module.get<IGetWalletService>(GetWalletService);
        walletRepository = module.get<IWalletRepository>(IWalletRepository);
        loggerWrapper = module.get<ILoggerWrapper>(ILoggerWrapper);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(walletRepository).toBeDefined();
    });

    describe('update wallet', () => {
        it('should be return ok', async () => {
            const result = await service.execute({ id: mockWallet.id });

            expect(result).toStrictEqual({
                ...{ data: { ...mockWallet } },
                ...{ statusCode: 200 },
            });

            expect(walletRepository.findById).toHaveBeenCalledWith({
                id: mockWallet.id,
            });
            expect(walletRepository.findById).toHaveBeenCalledTimes(1);
        });

        it('should be return Invalid walletId', async () => {
            jest.spyOn(walletRepository, 'findById').mockResolvedValue(null);
            const result = await service.execute({ id: mockWallet.id });

            expect(result).toStrictEqual({
                data: 'Invalid walletId',
                statusCode: 404,
            });
        });
    });
});
