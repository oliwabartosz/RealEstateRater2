import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlatsData } from './flats-data.entity';

@Entity({
  name: 'flats_gpt',
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
  technologyGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  technologySummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  legalStatusGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  legalSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  balconyGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  balconySummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  elevatorGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  elevatorSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  basementGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  basementSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  garageGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  garageSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  gardenGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  gardenSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  modernizationGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  modernizationSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  alarmGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  alarmSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  kitchenGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  kitchenSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  outbuildingGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  outbuildingSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  rentGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  rentSummary: string | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  qualityGPT: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  qualitySummary: string | null;

  @Column({
    type: 'boolean',
    default: null,
  })
  status: boolean;

  @OneToOne(() => FlatsData, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flatID' })
  flatsData: FlatsData;
}
