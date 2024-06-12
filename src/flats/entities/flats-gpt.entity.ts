import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlatsData } from './flats-data.entity';
import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';

@Entity({
  name: 'rer2_flats_gpt',
})
export class FlatsGPT {
  @PrimaryGeneratedColumn('uuid')
  flatID: string;

  @Column({
    type: 'text',
    default: null,
  })
  descriptionEN: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  technologyRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  technologySummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  legalStatusRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  legalStatusSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  balconyRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  balconySummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  elevatorRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  elevatorSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  basementRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  basementSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  garageRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  garageSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  gardenRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  gardenSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  modernizationRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  modernizationSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  monitoringRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  monitoringSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  kitchenRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  kitchenSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  outbuildingRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  outbuildingSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  rentRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  rentSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  qualityRating: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  qualitySummary: string | null;

  @Column({
    type: 'enum',
    enum: FlatsGPTStatus,
    default: null,
  })
  status: FlatsGPTStatus | null;

  @OneToOne(() => FlatsData, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flatID' })
  flatsData: FlatsData;
}
