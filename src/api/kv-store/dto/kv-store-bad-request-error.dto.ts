import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { KV_STORE_OK } from '../constants/kv-store.constants';

export class KVStoreBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: KV_STORE_OK,
    enum: KV_STORE_OK,
  })
  message: string;
}
