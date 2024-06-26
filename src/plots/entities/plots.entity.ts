import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import dataSource from '../../db/data-source';
import { PlotsAnswers } from './plots-answers.entity';

@Entity({
  name: 'rer2_plots_data',
})
export class PlotsData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: null,
  })
  plotNumber: number | null;

  @Column({
    length: 9,
    nullable: true,
    default: null,
  })
  market: string | null;

  @Column({
    length: 13,
    nullable: true,
    default: null,
  })
  offerId: string | null;

  @Column({
    length: 13,
    nullable: true,
    default: null,
  })
  offerIdExpected: string | null;

  @Column({
    length: 40,
    nullable: true,
    default: null,
  })
  offerType: string | null;

  @Column({
    length: 50,
    nullable: true,
    default: null,
  })
  offerStatus: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  dateAdded: Date | null;

  @Column({
    nullable: true,
    default: null,
  })
  dateChanged: Date | null;

  @Column({
    nullable: true,
    default: null,
  })
  dateUpdated: Date | null;

  @Column({
    nullable: true,
    default: null,
  })
  dateEndTransaction: Date | null;

  @Column({
    length: 42,
    nullable: true,
    default: null,
  })
  localization: string | null;

  @Column({
    length: 56,
    nullable: true,
    default: null,
  })
  street: string | null;

  @Column({
    length: 36,
    nullable: true,
    default: null,
  })
  legalStatus: string | null;

  @Column({
    type: 'float',
    precision: 12,
    scale: 2,
    nullable: true,
    unsigned: true,
    default: null,
  })
  price: number | null;

  @Column({
    nullable: true,
    unsigned: true,
    default: null,
  })
  priceOffer: number | null;

  @Column({
    nullable: true,
    unsigned: true,
    default: null,
  })
  priceSold: number | null;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
    nullable: true,
    unsigned: true,
    default: null,
  })
  plotArea: number | null;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
    nullable: true,
    unsigned: true,
    default: null,
  })
  priceM2: number | null;

  @Column({
    length: 3,
    nullable: true,
    default: null,
  })
  electricity: string | null;

  @Column({
    length: 3,
    nullable: true,
    default: null,
  })
  water: string | null;

  @Column({
    length: 3,
    nullable: true,
    default: null,
  })
  gas: string | null;

  @Column({
    length: 3,
    nullable: true,
    default: null,
  })
  sewers: string | null;

  @Column({
    length: 3,
    nullable: true,
    default: null,
  })
  buildingConditions: string | null;

  @Column({
    length: 3,
    nullable: true,
    default: null,
  })
  buildingPermit: string | null;

  @Column({
    length: 63,
    nullable: true,
    default: null,
  })
  localPlan: string | null;

  @Column({
    length: 15,
    nullable: true,
    default: null,
  })
  plotPurpose: string | null;

  @Column({
    length: 106,
    nullable: true,
    default: null,
  })
  plotPurposeInPlan: string | null;

  @Column({
    length: 14,
    nullable: true,
    default: null,
  })
  accessRoad: string | null;

  @Column({
    length: 12,
    nullable: true,
    default: null,
  })
  lotShape: string | null;

  @Column({
    length: 18,
    nullable: true,
    default: null,
  })
  waterIntake: string | null;

  @Column({
    length: 32,
    nullable: true,
    default: null,
  })
  sewageType: string | null;

  @Column({
    length: 9,
    nullable: true,
    default: null,
  })
  fence: string | null;

  @Column({
    length: 19,
    nullable: true,
    default: null,
  })
  buildingOnPlot: string | null;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
    nullable: true,
    unsigned: true,
    default: null,
  })
  plotWidth: number | null;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
    nullable: true,
    unsigned: true,
    default: null,
  })
  plotLength: number | null;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
    nullable: true,
    unsigned: true,
    default: null,
  })
  plotLengthToWidthRatio: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  description: string;

  @Column({
    type: 'text',
    default: null,
  })
  houseTypeLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  electricityLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  gasLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  waterLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  sewersLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  buildingOnPlotLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  roadLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  legalStatusLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  fenceLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  lotShapeLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  planningLemma: string;

  @Column({
    type: 'text',
    default: null,
  })
  buildingAllowanceLemma: string;

  @OneToOne(() => PlotsAnswers, { cascade: true })
  answers: PlotsAnswers;

  @BeforeInsert()
  async updatePlotNumber() {
    // Retrieve the last inserted plotNumber
    const lastRecordNumber = await dataSource.getRepository(PlotsData).findOne({
      order: { plotNumber: 'DESC' },
      where: {},
    });

    // Calculate the new plotNumber
    this.plotNumber = lastRecordNumber ? lastRecordNumber.plotNumber + 1 : 1;
  }
}
