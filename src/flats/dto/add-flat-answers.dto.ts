import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddFlatAnswersDto {
  @IsNotEmpty()
  @IsString()
  flatID: string;

  @IsOptional()
  @IsNumber()
  technologyAns?: number | null;

  @IsOptional()
  @IsNumber()
  legalStatusAns?: number | null;

  @IsOptional()
  @IsNumber()
  balconyAns?: number | null;

  @IsOptional()
  @IsNumber()
  elevatorAns?: number | null;

  @IsOptional()
  @IsNumber()
  basementAns?: number | null;

  @IsOptional()
  @IsNumber()
  garageAns?: number | null;

  @IsOptional()
  @IsNumber()
  gardenAns?: number | null;

  @IsOptional()
  @IsNumber()
  modernizationAns?: number | null;

  @IsOptional()
  @IsNumber()
  monitoringAns?: number | null;

  @IsOptional()
  @IsNumber()
  kitchenAns?: number | null;

  @IsOptional()
  @IsNumber()
  outbuildingAns?: number | null;

  @IsOptional()
  @IsNumber()
  qualityAns?: number | null;

  @IsOptional()
  @IsNumber()
  rentAns?: number | null;

  @IsOptional()
  @IsNumber()
  yearBuiltAns?: number | null;

  @IsOptional()
  @IsString()
  commentsAns?: string | null;

  @IsOptional()
  @IsBoolean()
  deleteAns?: boolean | null;

  @IsOptional()
  @IsString()
  rateStatus?: string | null;
}
