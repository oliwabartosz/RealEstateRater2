import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {PlotsData} from "./plots.entity";

@Entity({name: "plots_answers" })
export class PlotsAnswers {
    @PrimaryGeneratedColumn('uuid')
    plotID: string;

    @Column({
        type: "tinyint",
        default: null,
    })
    documentAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    plotPurposeJrAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    plotPurposeWrAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    plotPurposeJwrAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    plotPurposeFmtAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    houseTypeAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    lotShapeAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    buildingPermitAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    waterAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    gasAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    sewersAns: number | null;


    @Column({
        type: "tinyint",
        default: null,
    })
    accessRoadAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    buildingOnPlotAns: number | null;

    @Column({
        type: "tinyint",
        default: null,
    })
    fenceAns: number | null;

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

    @OneToOne(() => PlotsData, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'plotID' })
    plotsData: PlotsData;

}