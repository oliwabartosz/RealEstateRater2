import {AfterInsert, BeforeInsert, Column, Entity, getRepository, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {FlatsAnswers} from "./flats-answers.entity";
import dataSource from "../../db/data-source";
import {FlatsService} from "../flats.service";

@Entity({
    name: "flats_data"
})
export class FlatsData {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        default: null,
    })
    flatNumber: number | null;


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
    lawStatus: string | null;

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
        nullable: true,
        unsigned: true,
        default: null,
    })
    rent: number | null;

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
        length: 12,
        nullable: true,
        default: null,
    })
    material: string | null;

    @Column({
        nullable: true,
        default: null,
    })
    buildingType: string | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    yearBuilt: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    floorsNumber: number | null;

    @Column({
        length: 22,
        nullable: true,
        default: null,
    })
    buildingQuality: string | null;

    @Column({
        length: 22,
        nullable: true,
        default: null,
    })
    flatQuality: string | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    floor: number | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,

    })
    balcony: string | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    balconyQuantity: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    terracesQuantity: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    loggiasQuantity: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    frenchBalconyQuantity: number | null;

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
        length: 3,
        nullable: true,
        default: null,
    })
    basement: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    storageRoom: string | null;

    @Column({
        length: 3,
        nullable: true,
        default: null,
    })
    attic: string | null;

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
    priceParkingUnderground: number | null;

    @Column({
        nullable: true,
        unsigned: true,
        default: null,
    })
    priceParkingGround: number | null;

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
    elevator: string | null;

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
    monitoring: string | null;

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
    securityControl: string | null;

    @Column({
        type: "text",
        default: "",
    })
    description: string;


    @Column({
        type: "text",
        default: "",
    })
    balconyLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    elevatorLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    basementLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    garageLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    gardenLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    modernizationLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    monitoringLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    lawStatusLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    kitchenLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    technologyLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    outbuildingLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    rentLemma: string;

    @Column({
        type: "text",
        default: "",
    })
    streetLemma: string;

    @OneToOne(() => FlatsAnswers, {cascade: true})
    answers: FlatsAnswers;

    @BeforeInsert()
    async updateFlatNumber() {
        // Retrieve the last inserted flatNumber
        const lastRecordNumber = await dataSource.getRepository(FlatsData).findOne({
            order: { flatNumber: 'DESC' },
            where: {}
        });

        // Calculate the new flatNumber
        this.flatNumber = lastRecordNumber ? lastRecordNumber.flatNumber + 1 : 1;
    }
}