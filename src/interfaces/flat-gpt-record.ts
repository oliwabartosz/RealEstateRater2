export interface FlatGPTRecord {
  flatID: string;
  technologyRating?: number;
  technologySummary?: string;
  legalStatusRating?: number;
  legalStatusSummary?: string;
  balconyRating?: number;
  balconySummary?: string;
  elevatorRating?: number;
  elevatorSummary?: string;
  basementRating?: number;
  basementSummary?: string;
  garageRating?: number;
  garageSummary?: string;
  gardenRating?: number;
  gardenSummary?: string;
  modernizationRating?: number;
  modernizationSummary?: string;
  monitoringRating?: number;
  monitoringSummary?: string;
  kitchenRating?: number;
  kitchenSummary?: string;
  outbuildingRating?: number;
  outbuildingSummary?: string;
  rentRating?: number;
  rentSummary?: string;
  qualityRating?: number;
  status?: FlatsGPTStatus;
}

export type FlatGPTListResponse = FlatGPTRecord[];

export enum FlatsGPTStatus {
  TO_RATE = 'TO_RATE',
  COMPLETED = 'COMPLETED',
  NOT_RATED = 'NOT_RATED',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  SKIPPED = 'SKIPPED',
}
