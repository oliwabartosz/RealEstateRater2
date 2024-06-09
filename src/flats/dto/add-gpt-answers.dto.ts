import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';

export class AddGPTAnswersDto {
  @IsNotEmpty()
  @IsString()
  flatID: string;

  @IsOptional()
  @IsNumber()
  technologyRating?: number | null;

  @IsOptional()
  @IsString()
  technologySummary?: string | null;

  @IsOptional()
  @IsNumber()
  legalStatusRating?: number | null;

  @IsOptional()
  @IsString()
  legalStatusSummary?: string | null;

  @IsOptional()
  @IsNumber()
  balconyRating?: number | null;

  @IsOptional()
  @IsString()
  balconySummary?: string | null;

  @IsOptional()
  @IsNumber()
  elevatorRating?: number | null;

  @IsOptional()
  @IsString()
  elevatorSummary?: string | null;

  @IsOptional()
  @IsNumber()
  basementRating?: number | null;

  @IsOptional()
  @IsString()
  basementSummary?: string | null;

  @IsOptional()
  @IsNumber()
  garageRating?: number | null;

  @IsOptional()
  @IsString()
  garageSummary?: string | null;

  @IsOptional()
  @IsNumber()
  gardenRating?: number | null;

  @IsOptional()
  @IsString()
  gardenSummary?: string | null;

  @IsOptional()
  @IsNumber()
  modernizationRating?: number | null;

  @IsOptional()
  @IsString()
  modernizationSummary?: string | null;

  @IsOptional()
  @IsNumber()
  alarmRating?: number | null;

  @IsOptional()
  @IsString()
  alarmSummary?: string | null;

  @IsOptional()
  @IsNumber()
  kitchenRating?: number | null;

  @IsOptional()
  @IsString()
  kitchenSummary?: string | null;

  @IsOptional()
  @IsNumber()
  outbuildingRating?: number | null;

  @IsOptional()
  @IsString()
  outbuildingSummary?: string | null;

  @IsOptional()
  @IsNumber()
  rentRating?: number | null;

  @IsOptional()
  @IsString()
  rentSummary?: string | null;

  @IsOptional()
  @IsNumber()
  qualityRating?: number | null;

  @IsOptional()
  @IsString()
  qualitySummary?: string | null;

  @IsNotEmpty()
  status?: FlatsGPTStatus;
}
