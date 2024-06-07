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
import { FlatsData } from './entities/flats-data.entity';

@Processor(BULL_FLATS)
export class CreateArticleConsumer {
  constructor(
    private flatsService: FlatsService,
    private flatsAnswersService: FlatsAnswersService,
    private flatsGPTService: FlatsGPTService,
    private gptService: GptService,
  ) {}

  /* Logger initialization  */
  private readonly logger = new LoggerService(CreateArticleConsumer.name);

  private async getCurrentStatus(id: string) {
    const record = await this.flatsGPTService.getOneRecordByID(id);
    return record.status;
  }

  allowedTasksToProceed: FlatsGPTStatus[] = [FlatsGPTStatus.TO_RATE];

  @Process('flats')
  async rateFlat(job: Job<any>) {
    /* Check if the status is appropriate for further procedure */
    const taskStatus = await this.getCurrentStatus(job.data.id);
    if (this.allowedTasksToProceed.includes(taskStatus)) {
      this.logger.log(`Processing job ${job.id}`, CreateArticleConsumer.name);
      // TODO: RATE FLATS
      // ???
      const flatsData = new FlatsData(); // Create an instance of FlatsData
      this.gptService.rateFlatOffer(job.data.id, flatsData); // Pass the instance of FlatsData
      // this.langchainService.createArticle({ ...job.data });
    } else {
      this.logger.log(
        `Skipping the task (${
          job.data.id
        }) due to inappropriate STATUS <${taskStatus} not in ${this.allowedTasksToProceed.map(
          (task) => task,
        )} >`,
        CreateArticleConsumer.name,
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
