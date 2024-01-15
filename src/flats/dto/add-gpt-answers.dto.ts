import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class AddGPTAnswersDto {

    @IsOptional()
    @IsNumber()
    technologyGPT: number | null;

    @IsOptional()
    @IsString()
    technologySummary: string | null;

    @IsOptional()
    @IsNumber()
    lawStatusGPT: number | null;

    @IsOptional()
    @IsString()
    lawSummary: string | null;

    @IsOptional()
    @IsNumber()
    balconyGPT: number | null;

    @IsOptional()
    @IsString()
    balconySummary: string | null;

    @IsOptional()
    @IsNumber()
    elevatorGPT: number | null;

    @IsOptional()
    @IsString()
    elevatorSummary: string | null;

    @IsOptional()
    @IsNumber()
    basementGPT: number | null;

    @IsOptional()
    @IsString()
    basementSummary: string | null;

    @IsOptional()
    @IsNumber()
    garageGPT: number | null;

    @IsOptional()
    @IsString()
    garageSummary: string | null;

    @IsOptional()
    @IsNumber()
    gardenGPT: number | null;

    @IsOptional()
    @IsString()
    gardenSummary: string | null;

    @IsOptional()
    @IsNumber()
    modernizationGPT: number | null;

    @IsOptional()
    @IsString()
    modernizationSummary: string | null;

    @IsOptional()
    @IsNumber()
    alarmGPT: number | null;

    @IsOptional()
    @IsString()
    alarmSummary: string | null;

    @IsOptional()
    @IsNumber()
    kitchenGPT: number | null;

    @IsOptional()
    @IsString()
    kitchenSummary: string | null;

    @IsOptional()
    @IsNumber()
    outbuildingGPT: number | null;

    @IsOptional()
    @IsString()
    outbuildingSummary: string | null;

    @IsOptional()
    @IsNumber()
    rentGPT: number | null;

    @IsOptional()
    @IsString()
    rentSummary: string | null;

    @IsOptional()
    @IsNumber()
    qualityGPT: number | null;

    @IsNotEmpty()
    @IsBoolean()
    status: string;

}