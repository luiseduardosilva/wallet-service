import {
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryColumn,
    Generated,
} from 'typeorm';

export interface WalletSchema {
    id: number;
    name: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

@Entity('wallets')
export class WalletModel implements WalletSchema {
    @PrimaryColumn({ name: 'id' })
    @Generated('increment')
    id: number;

    @Column({ name: 'balance' })
    balance: number;

    @Column({ name: 'name' })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: string;
}
