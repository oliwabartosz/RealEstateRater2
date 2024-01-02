import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {FlatsData} from "./flats-data.entity";

@Entity({name: "flats_answers" })
export class FlatsAnswers {
    @PrimaryGeneratedColumn('uuid')
    flatID: string;

    @Column({
        type: "tinyint",
        default: null,
    })
    technologyAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    lawStatusAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    balconyAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    elevatorAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    basementAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    garageAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    gardenAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    modernizationAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    alarmAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    kitchenAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    outbuildingAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    qualityAns: number | null;

    @Column({
        type: "integer",
        default: null,
    })
    rentAns: number | null;

    @Column({
        type: "text",
        default: null,
    })
    commentsAns: string | null;

    @Column({
        type: "boolean",
        default: null,
    })
    deleteAns: boolean | null;

    @Column({
        length: 5,
        type: "varchar",
    })
    rateStatus: string;

    @Column({
        length: 10,
        type: "varchar",
    })
    user: string;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP"
    })
    updateDate: Date;

    @OneToOne(() => FlatsData)
    @JoinColumn({ name: 'flatID' })
    flatsData: FlatsData;


}