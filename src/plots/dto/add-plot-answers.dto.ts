import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class AddPlotAnswersDto {

    @IsNotEmpty()
    @IsString()
    plotID: string;

    @IsOptional()
    @IsNumber()
    documentAns: number | null;

    @IsOptional()
    @IsNumber()
    plotPurposeAns: number | null;

    @IsOptional()
    @IsNumber()
    plotPurposeJrAns: number | null;

    @IsOptional()
    @IsNumber()
    plotPurposeWrAns: number | null;

    @IsOptional()
    @IsNumber()
    plotPurposeJwrAns: number | null;

    @IsOptional()
    @IsNumber()
    plotPurposeFmtAns: number | null;

    @IsOptional()
    @IsNumber()
    houseTypeAns: number | null;

    @IsOptional()
    @IsNumber()
    lotShapeAns: number | null;

    @IsOptional()
    @IsNumber()
    waterAns: number | null;

    @IsOptional()
    @IsNumber()
    gasAns: number | null;

    @IsOptional()
    @IsNumber()
    electricityAns: number | null;

    @IsOptional()
    @IsNumber()
    sewersAns: number | null;

    @IsOptional()
    @IsNumber()
    isBuildingOnPlotAns: number | null;

    @IsOptional()
    @IsNumber()
    accessRoadAns: number | null;

    @IsOptional()
    @IsNumber()
    buildingPermitAns: number | null;

    @IsOptional()
    @IsNumber()
    buildingOnPlotAns: number | null;

    @IsOptional()
    @IsNumber()
    fenceAns: number | null;

    @IsOptional()
    @IsString()
    commentsAns: string | null;

    @IsOptional()
    @IsBoolean()
    deleteAns: boolean;

    @IsOptional()
    @IsString()
    rateStatus: string | null;

}