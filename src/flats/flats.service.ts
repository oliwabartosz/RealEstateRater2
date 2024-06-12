import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlatsData } from './entities/flats-data.entity';
import { DeleteResult, Repository } from 'typeorm';
import { FlatRecord, FlatsListResponse } from '../interfaces/flat-record';
import { CreateFlatDto } from './dto/create-flat.dto';
import { FlatsAnswers } from './entities/flats-answers.entity';
import { AddFlatAnswersDto } from './dto/add-flat-answers.dto';
import { FlatsGPT } from './entities/flats-gpt.entity';
import { FlatGPTRecord, FlatsGPTStatus } from '../interfaces/flat-gpt-record';
import { AddGPTAnswersDto } from './dto/add-gpt-answers.dto';
import { createNewAnswersRecord } from '../utils/create-new-answer-record';
import { updateAnswersRecord } from '../utils/update-answer-record';
import { checkIfIdExists } from '../utils/check-if-id-exists';
import { UpdateGptFlatStatusDto } from './dto/update-flat-gpt-status.dto';
import { LoggerService } from 'src/logger/logger.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BULL_FLATS } from './queue-constants';
import { RateFlatQueue } from './dto/queue.dto';

@Injectable()
export class FlatsService {
  constructor(
    @InjectRepository(FlatsData)
    private flatsDataRepository: Repository<FlatsData>,
  ) {}

  public async getAllRecords(): Promise<FlatRecord[]> {
    return await this.flatsDataRepository.find({
      select: [
        'id',
        'flatNumber',
        'offerId',
        'price',
        'offerType',
        'offerStatus',
      ],
      order: { flatNumber: 'ASC' },
    });
  }

  public async getAllRecordsIDs(): Promise<FlatsListResponse> {
    return await this.flatsDataRepository.find({
      select: ['id'],
    });
  }

  public async getOneRecordByFlatNumber(
    flatNumber: number,
  ): Promise<FlatsData> {
    return await this.flatsDataRepository.findOneByOrFail({ flatNumber });
  }

  public async getOneRecordByID(id: string): Promise<FlatsData> {
    return await this.flatsDataRepository.findOne({ where: { id } });
  }

  public async getLastNumber(): Promise<number | null> {
    const { flatNumber } = await this.flatsDataRepository.findOne({
      select: ['flatNumber'],
      order: { flatNumber: 'DESC' },
      where: {},
    });

    return flatNumber ? flatNumber : null;
  }

  public async createNewRecord(
    createRecordPayload: CreateFlatDto,
  ): Promise<FlatsData> {
    const newRecord = this.flatsDataRepository.create(createRecordPayload);
    await this.flatsDataRepository.save(newRecord);
    return newRecord;
  }

  public async removeRecordsByIDs(ids: string[]): Promise<DeleteResult> {
    return await this.flatsDataRepository.delete(ids);
  }

  public async removeAll(): Promise<DeleteResult> {
    return await this.flatsDataRepository.delete({});
  }
}

@Injectable()
export class FlatsAnswersService {
  constructor(
    @InjectRepository(FlatsAnswers)
    private flatsAnswersRepository: Repository<FlatsAnswers>,
    private readonly flatsService: FlatsService,
  ) {}

  public async getAllAnswersRecords(): Promise<FlatsAnswers[]> {
    return await this.flatsAnswersRepository.find({
      select: ['flatID', 'rateStatus', 'user', 'deleteAns'],
    });
  }

  public async getOneRecordByID(flatID: string): Promise<FlatsAnswers> {
    return await this.flatsAnswersRepository.findOne({ where: { flatID } });
  }

  public async createOrUpdateAnswer(
    recordID: string,
    user: string,
    dto: AddFlatAnswersDto,
  ): Promise<FlatsAnswers> {
    console.log('XYZ: jestem tutaj');
    await checkIfIdExists(this.flatsService, recordID);

    try {
      return await createNewAnswersRecord(
        this.flatsAnswersRepository,
        dto,
        user,
      );
    } catch (err) {
      if (
        err instanceof HttpException &&
        err.getStatus() === HttpStatus.BAD_REQUEST
      ) {
        return await updateAnswersRecord(
          this.flatsAnswersRepository,
          dto.flatID,
          dto,
        );
      } else {
        console.error(err);
        throw new HttpException(
          'Something went wrong.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class FlatsGPTService {
  constructor(
    @InjectRepository(FlatsGPT)
    private flatsGPTRepository: Repository<FlatsGPT>,
    private flatsService: FlatsService,
    //FIXME: problem with handlebars and logger service
    // private logger: LoggerService,
  ) {}

  public async getOneRecordByID(flatID: string): Promise<FlatsGPT> {
    return await this.flatsGPTRepository.findOne({ where: { flatID } });
  }

  public async getAllGPTRecords(): Promise<FlatGPTRecord[]> {
    return await this.flatsGPTRepository.find({
      select: ['flatID', 'status'],
    });
  }

  public async getAllRecordsIDs(): Promise<FlatGPTRecord[]> {
    return await this.flatsGPTRepository.find({
      select: ['flatID'],
    });
  }

  public async createOrUpdateGPTAnswer(
    recordID: string,
    user: string,
    dto: AddGPTAnswersDto,
  ): Promise<FlatsGPT> {
    await checkIfIdExists(this.flatsService, recordID);

    try {
      return await createNewAnswersRecord(
        this.flatsGPTRepository as Repository<any>,
        dto,
        user,
      );
    } catch (err) {
      if (
        err instanceof HttpException &&
        err.getStatus() === HttpStatus.BAD_REQUEST
      ) {
        return await updateAnswersRecord(
          this.flatsGPTRepository as Repository<any>,
          dto.flatID,
          dto,
        );
      } else {
        console.error(err);
        throw new HttpException(
          'Something went wrong.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  public async setStatus(updateGptFlatStatusDto: UpdateGptFlatStatusDto) {
    const taskToUpdate = await this.flatsGPTRepository.findOne({
      where: { flatID: updateGptFlatStatusDto.id },
    });

    if (!taskToUpdate) {
      console.log('TaskToUpdate', taskToUpdate);
      //FIXME: problem with handlebars and logger service
      // this.logger.error(`Task not found with id: ${updateGptFlatStatusDto.id}`);

      //TODO: check if it creates
      // this.createOrUpdateGPTAnswer(updateGptFlatStatusDto.id, 'ai', {
      //   flatID: updateGptFlatStatusDto.id,
      //   status: FlatsGPTStatus.PENDING,
      // });
      // console.log(
      //   `No record found, creating new one: (${updateGptFlatStatusDto.id})`,
      // );
    }

    const updatedStatus: FlatGPTRecord = {
      ...taskToUpdate,
      ...updateGptFlatStatusDto,
    };
    await this.flatsGPTRepository.save(updatedStatus);
    return updatedStatus;
  }

  public async createTranslatedDescription(
    recordID: string,
    description: string,
  ): Promise<FlatsGPT> {
    const translatedDescription = this.flatsGPTRepository.create({
      descriptionEN: description,
    });
    await this.flatsGPTRepository.save(translatedDescription);
    return translatedDescription;
  }
}

@Injectable()
export class FlatsRateAI {
  constructor(
    @InjectRepository(FlatsData)
    private flatsDataRepository: Repository<FlatsData>,
    @InjectRepository(FlatsAnswers)
    private flatsAnswersRepository: Repository<FlatsAnswers>,
    @InjectRepository(FlatsGPT)
    private flatsGPTRepository: Repository<FlatsGPT>,
    @InjectQueue(BULL_FLATS)
    private readonly rateFlatsnQueue: Queue,
    private readonly flatsService: FlatsService,
    private loggerService: LoggerService,
  ) {}

  /* Logger initialization  */
  private readonly logger = new LoggerService(FlatsRateAI.name);

  /* CREATE TASK */
  async addTask(addGPTPayload: AddGPTAnswersDto): Promise<FlatsGPT> {
    await this.flatsDataRepository.findOne({
      where: { id: addGPTPayload.flatID },
    });

    addGPTPayload.status = FlatsGPTStatus.TO_RATE;

    const newTask: FlatsGPT = this.flatsGPTRepository.create(addGPTPayload);
    await this.flatsGPTRepository.save(newTask);
    return newTask;
  }

  /* UPDATE TASK */
  async updateTask(
    addGPTPayload: AddGPTAnswersDto,
    id: string,
  ): Promise<FlatsGPT> {
    const taskToUpdate: FlatsGPT = await this.flatsGPTRepository.findOne({
      where: { flatID: id },
    });

    if (!taskToUpdate) {
      this.logger.error(`Task not found with id: ${id}`);
      throw new Error('Task not found');
    }

    const updatedTask: FlatsGPT = {
      ...taskToUpdate,
      ...addGPTPayload,
    };

    await this.flatsGPTRepository.save(updatedTask);

    return updatedTask;
  }

  /* ADD TO QUEUE */

  // Tu chyba będzie trzeba zmienić DTO tak, żeby zawierało FlatsData, FlatsAnswers, FlatsGPT
  async enqueueRateFlat(payload: { ids: string[] }): Promise<void> {
    const { ids } = payload;
    for (const id of ids) {
      const basicData = await this.flatsDataRepository.findOne({
        where: { id: id },
      });
      const answersData =
        (await this.flatsAnswersRepository.findOne({
          where: { flatID: id },
        })) || {};
      const gptData = await this.flatsGPTRepository.findOne({
        where: { flatID: id } || {},
      });

      const data: RateFlatQueue = {
        ...basicData,
        ...answersData,
        ...gptData,
      };

      // If there where no previous rating, there were no record in gpt database, hence status is undefined
      data.status = data.status || FlatsGPTStatus.TO_RATE;
      // Only tasks with the correct status will be included.
      const allowedTasks = [FlatsGPTStatus.TO_RATE];
      if (allowedTasks.includes(data.status)) {
        await this.rateFlatsnQueue.add(BULL_FLATS, data);
      }
    }
  }

  /* UPDATE - CHANGE STATUS */
  async setStatus(
    updateStatusPayload: UpdateGptFlatStatusDto,
  ): Promise<FlatsGPT> {
    const taskToUpdate: FlatsGPT = await this.flatsGPTRepository.findOne({
      where: { flatID: updateStatusPayload.id },
    });

    if (!taskToUpdate) {
      this.logger.error(`Task not found with id: ${updateStatusPayload.id}`);
      throw new Error('Task not found');
    }

    const updatedStatus: FlatsGPT = {
      ...taskToUpdate,
      ...updateStatusPayload,
    };
    await this.flatsGPTRepository.save(updatedStatus);
    return updatedStatus;
  }
}
