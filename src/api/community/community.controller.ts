import { CommunityInternalServerErrorDto } from './dto/community-internal-server-error-response.dto';
import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';
import { BullOkResponseDto } from 'src/common/dto/response/bull-ok-response.dto';
import { CommunityBadRequestDto } from './dto/community-bad-request-response.dto';
import { BaseFormatInterceptor } from 'src/common/interceptors/base-format.interceptor';

@ApiTags('community')
@ApiBadRequestResponse({type: CommunityBadRequestDto})
@ApiInternalServerErrorResponse({type: CommunityInternalServerErrorDto})
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @ApiOkResponse({type: BullOkResponseDto})
  @UseInterceptors(BaseFormatInterceptor)
  async createCommunity(@Body() dto: CreateCommunityDto) {
    return await this.communityService.createCommunity(dto);
  }
}
