import { ApiProperty } from '@nestjs/swagger';
import { COMMUNITY_INTERNAL_SERVER_ERRORS } from '../constants/community.constants';

export class CommunityInternalServerErrorDto {
  @ApiProperty({
    type: COMMUNITY_INTERNAL_SERVER_ERRORS,
    enum: COMMUNITY_INTERNAL_SERVER_ERRORS,
    example: COMMUNITY_INTERNAL_SERVER_ERRORS,
  })
  message: COMMUNITY_INTERNAL_SERVER_ERRORS;
}
