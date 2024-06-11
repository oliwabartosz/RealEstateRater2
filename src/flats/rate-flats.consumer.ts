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
    console.log('Getting record for id:', id);
    const record = await this.flatsGPTService.getOneRecordByID(id);
    console.log('Record:', record);
    if (!record) {
      console.log('No record found for id:', id);
    } else if (!record.status) {
      console.log('Record has no status');
    }
    const result = record?.status || FlatsGPTStatus.TO_RATE;
    console.log('Result:', result);
    return result;
  }

  allowedTasksToProceed: FlatsGPTStatus[] = [FlatsGPTStatus.TO_RATE];

  @Process(BULL_FLATS)
  async rateFlat(job: Job<any>) {
    /* Check if the status is appropriate for further procedure */
    console.log('Processing', job.data.id);
    const taskStatus = await this.getCurrentStatus(job.data.id);
    console.log('Task status:', taskStatus);
    console.log(this.allowedTasksToProceed.includes(taskStatus));
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
