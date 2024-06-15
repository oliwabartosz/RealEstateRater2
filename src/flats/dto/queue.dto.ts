import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';

export class RateFlatQueue {
  @IsString()
  flatID?: string;

  @IsOptional()
  @IsString()
  market?: string;

  @IsString()
  @IsNotEmpty()
  offerId?: string;

  @IsString()
  @IsNotEmpty()
  offerIdExpected?: string;

  @IsString()
  @IsNotEmpty()
  offerType?: string;

  @IsString()
  @IsNotEmpty()
  offerStatus?: string;

  @IsOptional()
  @IsString()
  dateAdded?: Date;

  @IsOptional()
  @IsString()
  dateChanged?: Date;

  @IsOptional()
  @IsString()
  dateUpdated?: Date;

  @IsOptional()
  @IsString()
  dateEndTransaction?: Date;

  @IsString()
  localization?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  lawStatus?: string;

  @IsNotEmpty()
  @IsNumber()
  price?: number;

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
  description?: string;

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
  alarmAns?: number | null;

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
  @IsBoolean()
  deleteAns?: boolean | null;

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
