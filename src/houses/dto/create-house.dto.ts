import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateHouseDto {

    @IsOptional()
    @IsString()
    market?: string;

    @IsString()
    @IsNotEmpty()
    offerId: string;

    @IsString()
    @IsNotEmpty()
    offerIdExpected: string;

    @IsString()
    @IsNotEmpty()
    offerType: string;

    @IsString()
    @IsNotEmpty()
    offerStatus: string;

    @IsOptional()
    @IsString()
    dateAdded: Date;

    @IsOptional()
    @IsString()
    dateChanged?: Date;

    @IsOptional()
    @IsString()
    dateUpdated: Date;

    @IsOptional()
    @IsString()
    dateEndTransaction?: Date;

    @IsOptional()
    @IsString()
    localization: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    lawStatus?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    priceOffer?: number;

    @IsOptional()
    @IsNumber()
    priceSold?: number;

    @IsOptional()
    @IsNumber()
    livingArea?: number;

    @IsOptional()
    @IsNumber()
    houseArea?: number;

    @IsOptional()
    @IsNumber()
    plotArea?: number;

    @IsOptional()
    @IsString()
    houseQuality?: string;

    @IsOptional()
    @IsNumber()
    priceM2?: number;

    @IsOptional()
    @IsString()
    houseType?: string;

    @IsOptional()
    @IsString()
    buildingQuality?: string;

    @IsOptional()
    @IsString()
    material?: string;

    @IsOptional()
    @IsNumber()
    yearBuilt?: number;

    @IsOptional()
    @IsString()
    parkingPlace?: string;

    @IsOptional()
    @IsNumber()
    floorsNumber?: number;

    @IsOptional()
    @IsNumber()
    garagesNumber?: number;

    @IsOptional()
    @IsNumber()
    roomsNumber?: number;

    @IsOptional()
    @IsString()
    kitchenType?: string;

    @IsOptional()
    @IsNumber()
    bathsNumber?: number;

    @IsOptional()
    @IsString()
    basement?: string;

    @IsOptional()
    @IsString()
    lotShape?: string;

    @IsOptional()
    @IsString()
    garden?: string;

    @IsOptional()
    @IsString()
    fence?: string;

    @IsOptional()
    @IsString()
    monitoring?: string;

    @IsOptional()
    @IsString()
    security?: string;

    @IsOptional()
    @IsString()
    guardedArea?: string;

    @IsOptional()
    @IsString()
    guardedEstate?: string;

    @IsOptional()
    @IsString()
    securityControl?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    garageLemma?: string;

    @IsOptional()
    @IsString()
    modernizationLemma?: string;

    @IsOptional()
    @IsString()
    monitoringLemma?: string;

    @IsOptional()
    @IsString()
    legalStatusLemma?: string;

    @IsOptional()
    @IsString()
    buildingTypeLemma?: string;

    @IsOptional()
    @IsString()
    kitchenLemma?: string;

    @IsOptional()
    @IsString()
    bathroomLemma?: string;

    @IsOptional()
    @IsString()
    streetLemma?: string;
}