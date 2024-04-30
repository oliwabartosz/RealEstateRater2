import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddHouseAnswersDto {
  @IsNotEmpty()
  @IsString()
  houseID: string;

  @IsOptional()
  @IsNumber()
  technologyAns: number | null;

  @IsOptional()
  @IsNumber()
  legalStatusAns: number | null;

  @IsOptional()
  @IsNumber()
  houseTypeAns: number | null;

  @IsOptional()
  @IsNumber()
  garageAns: number | null;

  @IsOptional()
  @IsNumber()
  modernizationAns: number | null;

  @IsOptional()
  @IsNumber()
  alarmAns: number | null;

  @IsOptional()
  @IsNumber()
  kitchenAns: number | null;

  @IsOptional()
  @IsNumber()
  bathNumberAns: number | null;

  @IsOptional()
  @IsNumber()
  yearBuiltAns: number | null;

  @IsOptional()
  @IsNumber()
  qualityAns: number | null;

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
