import {BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import dataSource from "../../db/data-source";
import {HousesAnswers} from "./houses-answers.entity";

@Entity({
    name: "houses_data"
})

export class HousesData {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        default: null,
    })
    houseNumber: number | null;


    @Column({
        length: 9,
        nullable: true,
        default: null,
    })
    market: string | null;

    @Column({
        length: 13,
        nullable: true,
        default: null,
    })
    offerId: string | null;

    @Column({
        length: 13,
        nullable: true,
        default: null,
    })
    offerIdExpected: string | null;

    @Column({
        length: 13,
        nullable: true,
        default: null,
    })
    offerType: string | null;

    @Column({
        length: 23,
        nullable: true,
        default: null,
    })
    offerStatus: string | null;

    @Column({
        nullable: true,
        default: null,
    })
    dateAdded: Date | null;

    @Column({
        nullable: true,
        default: null,
    })
    dateChanged: Date | null;

    @Column({
        nullable: true,
        default: null,
    })
    dateUpdated: Date | null;

    @Column({
        nullable: true,
        default: null,
    })
    dateEndTransaction: Date | null;

    @Column({
        length: 42,
        nullable: true,
        default: null,
    })
    localization: string | null;

    @Column({
        length: 56,
        nullable: true,
        default: null,
    })
    street: string | null;

    @Column({
        length: 36,
        nullable: true,
        default: null,
    })
    legalStatus: string | null;

    @Column({
        type: "float",
        precision: 12,
        scale: 2,
        nullable: true,
        unsigned: true,
        default: null,
    })
    price: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    priceOffer: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    priceSold: number | null;

    @Column({
        type: "float",
        precision: 6,
        scale: 2,
        nullable: true,
        unsigned: true,
        default: null,
    })
    livingArea: number | null;

    @Column({
        type: "float",
        precision: 6,
        scale: 2,
        nullable: true,
        unsigned: true,
        default: null,
    })
    houseArea: number | null;

    @Column({
        type: "float",
        precision: 7,
        scale: 2,
        nullable: true,
        unsigned: true,
        default: null,
    })
    plotArea: number | null;

    @Column({
        length: 22,
        nullable: true,
        default: null,
    })
    houseQuality: string | null;

    @Column({
        type: "float",
        precision: 7,
        scale: 2,
        nullable: true,
        unsigned: true,
        default: null,
    })
    priceM2: number | null;


    @Column({
        length: 16,
        nullable: true,
        default: null,
    })
    houseType: string | null;

    @Column({
        length: 22,
        nullable: true,
        default: null,
    })
    buildingQuality: string | null;

    @Column({
        length: 12,
        nullable: true,
        default: null,
    })
    material: string | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    yearBuilt: number | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    parkingPlace: string | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    floorsNumber: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    garagesNumber: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    roomsNumber: number | null;

    @Column({
        length: 14,
        nullable: true,
        default: null,
    })
    kitchenType: string | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    bathsNumber: number | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    basement: string | null;

    @Column({
        length: 12,
        nullable: true,
        default: null,
    })
    lotShape: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    garden: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    fence: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    monitoring: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    security: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    guardedArea: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    guardedEstate: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    securityControl: string | null;

    @Column({
        type: "text",
    })
    description: string;

    @Column({
        type: "text",
    })
    garageLemma: string;

    @Column({
        type: "text",
    })
    modernizationLemma: string;

    @Column({
        type: "text",
    })
    monitoringLemma: string;

    @Column({
        type: "text",
    })
    legalStatusLemma: string;

    @Column({
        type: "text",
    })
    buildingTypeLemma: string;

    @Column({
        type: "text",
    })
    kitchenLemma: string;

    @Column({
        type: "text",
    })
    bathroomLemma: string;

    @Column({
        type: "text",
    })
    streetLemma: string;


    @OneToOne(() => HousesAnswers, {cascade: true})
    answers: HousesAnswers;

    @BeforeInsert()
    async updateHouseNumber() {
        // Retrieve the last inserted houseNumber
        const lastRecordNumber = await dataSource.getRepository(HousesData).findOne({
            order: { houseNumber: 'DESC' },
            where: {}
        });

        // Calculate the new houseNumber
        this.houseNumber = lastRecordNumber ? lastRecordNumber.houseNumber + 1 : 1;
    }

}
