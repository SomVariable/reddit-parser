import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBadRequestResponse, ApiConsumes, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostBadRequestDto } from './dto/post-bad-request-response.dto';
import { POSTInternalServerErrorDto } from './dto/post-internal-server-error-response.dto';
import { BullOkResponseDto } from 'src/common/dto/response/bull-ok-response.dto';
import { BaseFormatInterceptor } from 'src/common/interceptors/base-format.interceptor';

@ApiTags('post')
@ApiBadRequestResponse({type: PostBadRequestDto})
@ApiInternalServerErrorResponse({type: POSTInternalServerErrorDto})
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({type: BullOkResponseDto})
  @UseInterceptors(FileInterceptor('file'),  BaseFormatInterceptor)
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePostDto,
  ) {
    return await this.postService.createPost(dto, file)
  }
}
