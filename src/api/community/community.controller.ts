import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { ApiTags } from '@nestjs/swagger';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';

@ApiTags('community')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  async createCommunity(@Body() dto: CreateCommunityDto) {
    return await this.communityService.createCommunity(dto);
  }
}
