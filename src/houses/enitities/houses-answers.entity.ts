import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "houses_answers" })
export class HousesAnswers {
    @PrimaryGeneratedColumn('uuid')
    houseID: string;

    @Column({
        type: "tinyint",
        default: null,
    })
    technologyAns: number | null;
}