import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KV_STORE_OK } from '../constants/kv-store.constants';

@Injectable()
export class KVStoreInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          data: data,
          message: KV_STORE_OK.OK,
        };
      }),
    );
  }
}
