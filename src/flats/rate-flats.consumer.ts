import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
// import { LangchainService } from 'src/langchain/langchain.service';
// import { LoggerService } from 'src/logger/logger.service';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from './flats.service';
import { BULL_FLATS } from './queue-constants';
import { LoggerService } from 'src/logger/logger.service';
import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';
import { GptService } from 'src/gpt/gpt.service';

@Processor(BULL_FLATS)
export class RateFlatAI {
  constructor(
    private flatsService: FlatsService,
    private flatsAnswersService: FlatsAnswersService,
    private flatsGPTService: FlatsGPTService,
    private gptService: GptService,
  ) {}

  /* Logger initialization  */
  private readonly logger = new LoggerService(RateFlatAI.name);

  private async getCurrentStatus(id: string): Promise<FlatsGPTStatus> {
    const record = await this.flatsGPTService.getOneRecordByID(id);
    if (!record) {
      this.logger.warn(`No record found with ${id}`, RateFlatAI.name);
    } else if (!record.status) {
      this.logger.warn('Record has no status', RateFlatAI.name);
    }
    const result = record?.status || FlatsGPTStatus.TO_RATE;
    return result;
  }

  allowedTasksToProceed: FlatsGPTStatus[] = [FlatsGPTStatus.TO_RATE];

  @Process(BULL_FLATS)
  async rateFlat(job: Job<any>) {
    /* Check if the status is appropriate for further procedure */
    const taskStatus = await this.getCurrentStatus(job.data.id);
    this.logger.log(
      `Processing id: ${job.data.id}, which has Task Status: ${taskStatus}`,
      RateFlatAI.name,
    );
    if (this.allowedTasksToProceed.includes(taskStatus)) {
      this.logger.log(`Processing job ${job.id}`, RateFlatAI.name);
      this.gptService.rateFlatOffer(job.data.id); // Pass the instance of FlatsData
    } else {
      this.logger.log(
        `Skipping the task (${
          job.data.id
        }) due to inappropriate STATUS <${taskStatus} not in ${this.allowedTasksToProceed.map(
          (task) => task,
        )} >`,
        RateFlatAI.name,
      );
      if (job.data.status !== FlatsGPTStatus.COMPLETED) {
        this.flatsGPTService.setStatus({
          id: job.data.id,
          status: FlatsGPTStatus.SKIPPED,
        });
      }
    }
  }
}
