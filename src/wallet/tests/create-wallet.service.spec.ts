import { Test, TestingModule } from '@nestjs/testing';

import { ICreateWalletService } from '../services/interfaces';
import { IWalletRepository } from '../repositories/interfaces';
import { CreateWalletService } from '../services/create-wallet.service';
import { DatabaseException } from '../../exceptions';

describe('CreateWalletService', () => {
    let service: ICreateWalletService;
    let walletRepository: IWalletRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateWalletService,
                {
                    provide: IWalletRepository,
                    useValue: {
                        create: jest.fn().mockResolvedValue({}),
                    },
                },
            ],
        }).compile();

        service = module.get<ICreateWalletService>(CreateWalletService);
        walletRepository = module.get<IWalletRepository>(IWalletRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(walletRepository).toBeDefined();
    });

    describe('create wallet', () => {
        it('should be return ok', async () => {
            const result = await service.execute({
                name: 'Luis',
            });

            expect(result).toStrictEqual({
                data: 'Wallet created',
                statusCode: 201,
            });
            expect(walletRepository.create).toHaveBeenCalledWith({
                name: 'Luis',
            });
            expect(walletRepository.create).toHaveBeenCalledTimes(1);
        });

        it('should be return database Error', async () => {
            jest.spyOn(walletRepository, 'create').mockResolvedValue(
                new DatabaseException(),
            );
            const result = await service.execute({
                name: 'Luis',
            });

            expect(result).toStrictEqual({
                data: 'Database error',
                statusCode: 500,
            });
            expect(walletRepository.create).toHaveBeenCalledWith({
                name: 'Luis',
            });
            expect(walletRepository.create).toHaveBeenCalledTimes(1);
        });

        it('should be return database Error', async () => {
            jest.spyOn(walletRepository, 'create').mockResolvedValue(null);
            const result = await service.execute({
                name: 'Luis',
            });

            expect(result).toStrictEqual({
                data: 'Erro to create wallet',
                statusCode: 500,
            });
            expect(walletRepository.create).toHaveBeenCalledWith({
                name: 'Luis',
            });
            expect(walletRepository.create).toHaveBeenCalledTimes(1);
        });
    });
});
