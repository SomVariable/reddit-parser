import {
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KVStoreInterceptor } from './interceptors/kv-store.interceptor';
import { KVStoreOkResponse } from './dto/ok-response/ok.dto';
import { KVStoreBadRequestErrorResponse } from './dto/kv-store-bad-request-error.dto';
import { KVStoreNotFoundErrorResponse } from './dto/kv-store-not-found-error.dto';

@ApiTags('kv-store')
@ApiOkResponse({ type: KVStoreOkResponse })
@ApiBadRequestResponse({ type: KVStoreBadRequestErrorResponse })
@ApiNotFoundResponse({ type: KVStoreNotFoundErrorResponse })
@UseInterceptors(KVStoreInterceptor)
@Controller('kv-store')
export class KvStoreController {
  constructor(private readonly kvStoreService: KvStoreService) {}
}
