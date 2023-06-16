import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Signup {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    isVerified: boolean;

    @Column({nullable: true})
    verification_code: string;

    @Column({nullable :true, default: 0})
    logincount: number;

    @Column({nullable: true})
    attemptime: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable: true})
    created_by: string;

    @CreateDateColumn()
    updated_at: Date;

    @UpdateDateColumn({nullable: true})
    updated_by: string;

    @DeleteDateColumn()
    deleted_at: Date;
    
}