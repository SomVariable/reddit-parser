import { ApiProperty } from '@nestjs/swagger';
import { COMMUNITY_BAD_REQUEST_ERRORS } from '../constants/community.constants';

export class CommunityBadRequestDto {
  @ApiProperty({
    type: COMMUNITY_BAD_REQUEST_ERRORS,
    enum: COMMUNITY_BAD_REQUEST_ERRORS,
    example: COMMUNITY_BAD_REQUEST_ERRORS,
  })
  message: COMMUNITY_BAD_REQUEST_ERRORS;
}
