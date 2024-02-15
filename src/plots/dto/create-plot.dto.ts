import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreatePlotDto {

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
    plotArea?: number;

    @IsOptional()
    @IsNumber()
    priceM2?: number;

    @IsOptional()
    @IsString()
    electricity?: string;

    @IsOptional()
    @IsString()
    water?: string;

    @IsOptional()
    @IsString()
    gas?: string;

    @IsOptional()
    @IsString()
    sewers?: string;

    @IsOptional()
    @IsString()
    buildingConditions?: string;

    @IsOptional()
    @IsString()
    buildingPermit?: string;

    @IsOptional()
    @IsString()
    localPlan?: string;

    @IsOptional()
    @IsString()
    plotPurpose?: string;

    @IsOptional()
    @IsString()
    plotPurposeInPlan?: string;

    @IsOptional()
    @IsString()
    accessRoad?: string;

    @IsOptional()
    @IsString()
    lotShape?: string;

    @IsOptional()
    @IsString()
    waterIntake?: string;

    @IsOptional()
    @IsString()
    sewageType?: string;

    @IsOptional()
    @IsString()
    fence?: string;

    @IsOptional()
    @IsString()
    buildingOnPlot?: string;

    @IsOptional()
    @IsNumber()
    plotWidth?: number;

    @IsOptional()
    @IsNumber()
    plotLength?: number;

    @IsOptional()
    @IsNumber()
    plotLengthToWidthRatio?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    houseTypeLemma?: string;

    @IsOptional()
    @IsString()
    electricityLemma?: string;

    @IsOptional()
    @IsString()
    gasLemma?: string;

    @IsOptional()
    @IsString()
    waterLemma?: string;

    @IsOptional()
    @IsString()
    sewersLemma?: string;

    @IsOptional()
    @IsString()
    buildingOnPlotLemma?: string;

    @IsOptional()
    @IsString()
    roadLemma?: string;

    @IsOptional()
    @IsString()
    lawStatusLemma?: string;

    @IsOptional()
    @IsString()
    fenceLemma?: string;

    @IsOptional()
    @IsString()
    lotShapeLemma?: string;

    @IsOptional()
    @IsString()
    planningLemma?: string;

    @IsOptional()
    @IsString()
    buildingAllowanceLemma?: string;

}
