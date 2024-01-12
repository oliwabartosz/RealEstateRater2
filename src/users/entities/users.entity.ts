import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../../interfaces/roles";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        length: 300,
    })
    email: string;

    @Column({
        type: 'enum',
        enum: Role,
        // array: true,
        default: [Role.User]
    })
    roles: Role[];

    @Column()
    password: string;
}