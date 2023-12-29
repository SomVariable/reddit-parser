import { BrowserService } from './../browser.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BROWSER_BAD_REQUEST_ERRORS } from '../constants/browser.constants';
import * as multer from 'multer';

@Injectable()
export class BrowserGuard implements CanActivate {
  constructor(private readonly browserService: BrowserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const contentType = request.headers['content-type'];
    let dto = request.body;
    if (!this.browserService.getBrowser({ email: dto.email })) {
      throw new BadRequestException(BROWSER_BAD_REQUEST_ERRORS.MISSING_BROWSER);
    }

    return true;
  }
}
