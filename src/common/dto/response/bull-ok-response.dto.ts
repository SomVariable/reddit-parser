import { ApiProperty } from '@nestjs/swagger';
import { JobId } from 'bull';
import { BULL } from 'src/api/browser/constants/browser.constants';
import { IBullType } from 'src/api/kv-store/kv-types/kv-store.type';

export class BullOkResponseDto implements IBullType {
  @ApiProperty({
    example: 10,
  })
  id: JobId;
  @ApiProperty({
    example: BULL.NAME,
  })
  name: string;
  @ApiProperty({
    example: {
        somData: 'somEmail@gmail.com'
    },
  })
  data: any;
}
