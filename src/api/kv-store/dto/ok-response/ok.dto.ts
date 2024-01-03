import { ApiProperty } from '@nestjs/swagger';
import {
  KV_STORE_OK,
  SESSION_EXAMPLE,
} from '../../constants/kv-store.constants';

export class KVStoreOkResponse {
  @ApiProperty({
    type: KV_STORE_OK,
    enum: KV_STORE_OK,
  })
  message: KV_STORE_OK;

  @ApiProperty({
    example: SESSION_EXAMPLE,
  })
  data: any;
}
