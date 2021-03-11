import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    Unique,
    PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";


@Entity({ name: "users" })
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255, { message: 'Name is too long. Maximal length is 255 characters' })
    @Column({ nullable: false })
    username: string;

    @IsNotEmpty()
    @IsString()
    @Exclude()
    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async generateData() {
        this.password = await bcrypt.hash(this.password, process.env.BCRYPT_GEN_SALT);
    }

    @BeforeUpdate()
    async UpdateDate() {
        this.updatedAt = new Date();
    }

}