import { MigrationInterface, QueryRunner } from 'typeorm';

export class walletTable1678145887210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const createWalletTable = `
        
        CREATE TABLE IF NOT EXISTS "wallets"
            (
                "id"         SERIAL    NOT NULL PRIMARY KEY,
                "name"       VARCHAR   NOT NULL,
                "balance"    DECIMAL   NOT NULL DEFAULT  0.0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );        
        `;

        await queryRunner.manager.query(createWalletTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const dropWalletTable = `DROP TABLE IF EXISTS "wallets";`;
        await queryRunner.manager.query(dropWalletTable);
    }
}
