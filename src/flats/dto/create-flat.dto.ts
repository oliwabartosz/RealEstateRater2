import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateFlatDto {
    @IsOptional()
    @IsString()
    market: string;

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
    dateAdded?: string;

    @IsOptional()
    @IsString()
    dateChanged?: string;

    @IsOptional()
    @IsString()
    dateUpdated?: string;

    @IsOptional()
    @IsString()
    dateEndTransaction?: string;

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
    rent?: number;

    @IsOptional()
    @IsNumber()
    priceM2?: number;

    @IsOptional()
    @IsNumber()
    livingArea?: number;

    @IsOptional()
    @IsString()
    material?: string;

    @IsOptional()
    @IsString()
    buildingType?: string;

    @IsOptional()
    @IsNumber()
    yearBuilt?: number;


    @IsOptional()
    @IsNumber()
    floorsNumber?: number;

    @IsOptional()
    @IsString()
    buildingQuality?: string;

    @IsOptional()
    @IsString()
    flatQuality?: string;

    @IsOptional()
    @IsNumber()
    floor?: number;

    @IsOptional()
    @IsString()
    balcony?: string;

    @IsOptional()
    @IsNumber()
    balconyQuantity?: number;

    @IsOptional()
    @IsNumber()
    terracesQuantity?: number;

    @IsOptional()
    @IsNumber()
    loggiasQuantity?: number;

    @IsOptional()
    @IsNumber()
    frenchBalconyQuantity?: number;

    @IsOptional()
    @IsNumber()
    roomsNumber?: number;

    @IsOptional()
    @IsString()
    kitchenType?: string;

    @IsOptional()
    @IsString()
    basement?: string;

    @IsOptional()
    @IsString()
    storageRoom?: string;

    @IsOptional()
    @IsString()
    attic?: string;

    @IsOptional()
    @IsString()
    parkingPlace?: string;

    @IsOptional()
    @IsNumber()
    priceParkingUnderground?: number;

    @IsOptional()
    @IsNumber()
    priceParkingGround?: number;

    @IsOptional()
    @IsString()
    garden?: string;

    @IsOptional()
    @IsString()
    elevator?: string;

    @IsOptional()
    @IsString()
    security?: string;

    @IsOptional()
    @IsString()
    monitoring?: string;

    @IsOptional()
    @IsString()
    guardedArea?: string;

    @IsOptional()
    @IsString()
    guardedEstate?: string;

    @IsOptional()
    @IsString()
    securityControl?: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    balconyLemma?: string;

    @IsOptional()
    @IsString()
    elevatorLemma?: string;

    @IsOptional()
    @IsString()
    basementLemma?: string;

    @IsOptional()
    @IsString()
    garageLemma?: string;

    @IsOptional()
    @IsString()
    gardenLemma?: string;

    @IsOptional()
    @IsString()
    modernizationLemma?: string;

    @IsOptional()
    @IsString()
    monitoringLemma?: string;

    @IsOptional()
    @IsString()
    lawStatusLemma?: string;

    @IsOptional()
    @IsString()
    kitchenLemma?: string;

    @IsOptional()
    @IsString()
    technologyLemma?: string;

    @IsOptional()
    @IsString()
    outbuildingLemma?: string;

    @IsOptional()
    @IsString()
    rentLemma?: string;

    @IsOptional()
    @IsString()
    streetLemma?: string;

}
