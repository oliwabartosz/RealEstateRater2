import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prompts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
    default: null,
  })
  prompt: string;
}
