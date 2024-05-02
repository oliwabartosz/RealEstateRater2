import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${new Intl.DateTimeFormat('pl-PL', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Warsaw',
    } as Intl.DateTimeFormatOptions).format(new Date())}\t${entry}\n`;

    try {
      const logsDir = path.join(__dirname, '..', '..', 'logs');
      const logFile = path.join(logsDir, 'logs.log');
      // console.log(`Log file path: ${logFile}`); // Log the path to the console
      // console.log(`Entry to save: ${formattedEntry}`); // Log the entry to the console
      if (!fs.existsSync(logsDir)) {
        await fsPromises.mkdir(logsDir);
      }
      await fsPromises.appendFile(logFile, formattedEntry);
    } catch (err) {
      console.error(err);
    }
  }

  async log(message: any, context?: string) {
    const entry: string = `${context}\t${message}`;
    await this.logToFile(entry);
    super.log(message, context);
  }

  async error(message: any, stackOrContext?: string) {
    const entry: string = `${stackOrContext}\t${message}`;
    await this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
