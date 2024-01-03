import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BrowserService } from 'src/api/browser/browser.service';

export class BunGuard implements CanActivate {
  constructor(private readonly browserService: BrowserService) {}
  
    canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const data = request?.param;
    const page = this.browserService.getPage(data.email)
    const bunElement = page.$('#AppRouter-main-content > div > div:nth-child(1) > div > div > h3')
    const bunText = page.$("#AppRouter-main-content > div > div:nth-child(1) > div > div > div._3VTI5BOpJO70xoBKSqz3O9")
    if (bunElement) {
        console.log('we are here');  
    } 
    return true;
  }
}
