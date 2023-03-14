import { Test, TestingModule } from '@nestjs/testing';

import { IUpdateWalletService } from '../services/interfaces';
import { IWalletRepository } from '../repositories/interfaces';
import { UpdateWalletBalanceService } from '../services/update-wallet-value.service';
import { ILoggerWrapper } from '../../wrappers';
import { DatabaseException } from '../../exceptions';

const mockWallet = {
    id: 1,
    balance: 100,
    name: 'Luis',
    createdAt: '2023-03-07T01:18:40.636Z',
    updatedAt: '2023-03-13T22:59:24.422Z',
};

describe('UpdateWalletService', () => {
    let service: IUpdateWalletService;
    let walletRepository: IWalletRepository;
    let loggerWrapper: ILoggerWrapper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateWalletBalanceService,
                {
                    provide: IWalletRepository,
                    useValue: {
                        updateBalance: jest.fn().mockResolvedValue(true),
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

        service = module.get<IUpdateWalletService>(UpdateWalletBalanceService);
        walletRepository = module.get<IWalletRepository>(IWalletRepository);
        loggerWrapper = module.get<ILoggerWrapper>(ILoggerWrapper);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(walletRepository).toBeDefined();
    });

    describe('update wallet', () => {
        it('should be return ok', async () => {
            const params = {
                value: 100,
                walletId: 1,
            };
            const result = await service.execute(params);

            expect(result).toStrictEqual({
                data: 'Balance is changed',
                statusCode: 200,
            });

            expect(walletRepository.updateBalance).toHaveBeenCalledWith({
                value: params.value + mockWallet.balance,
                walletId: params.walletId,
            });
            expect(walletRepository.updateBalance).toHaveBeenCalledTimes(1);
        });

        it('should be return database Error', async () => {
            jest.spyOn(walletRepository, 'updateBalance').mockResolvedValue(
                new DatabaseException(),
            );
            const params = {
                value: 100,
                walletId: 1,
            };
            const result = await service.execute(params);

            expect(result).toStrictEqual({
                data: 'Database error',
                statusCode: 500,
            });
            expect(walletRepository.updateBalance).toHaveBeenCalledWith({
                value: params.value + mockWallet.balance,
                walletId: params.walletId,
            });
            expect(walletRepository.updateBalance).toHaveBeenCalledTimes(1);
        });
    });
});
