import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HousesData } from './houses-data.entity';

@Entity({ name: 'houses_answers' })
export class HousesAnswers {
  @PrimaryGeneratedColumn('uuid')
  houseID: string;

  @Column({
    type: 'tinyint',
    default: null,
  })
  technologyAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  legalStatusAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  houseTypeAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  garageAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  modernizationAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  alarmAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  kitchenAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  bathNumberAns: number | null;

  @Column({
    type: 'integer',
    default: null,
  })
  yearBuiltAns: number | null;

  @Column({
    type: 'tinyint',
    default: null,
  })
  qualityAns: number | null;

  @Column({
    type: 'text',
    default: null,
  })
  commentsAns: string | null;

  @Column({
    type: 'boolean',
    default: null,
  })
  deleteAns: boolean | null;

  @Column({
    length: 5,
    type: 'varchar',
  })
  rateStatus: string;

  @Column({
    length: 10,
    type: 'varchar',
  })
  user: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;

  @OneToOne(() => HousesData, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'houseID' })
  housesData: HousesData;
}
