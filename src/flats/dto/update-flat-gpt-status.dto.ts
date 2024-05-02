import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';

export interface UpdateGptFlatStatusDto {
  id: string;
  status: FlatsGPTStatus;
}
