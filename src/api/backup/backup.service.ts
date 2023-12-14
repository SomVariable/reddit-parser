import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { FILE_NAME } from '../file/constants/file.constants';

@Injectable()
export class BackupService {
  async backupAccounts(json: string, fileName: FILE_NAME) {
    try {
        console.log(json)
        const backupFilePath = `backups/${Date.now()}_${fileName}`;
        await fs.writeFile(backupFilePath, json);
        
    } catch (error) {
        throw new InternalServerErrorException('cannot save backup')
    }
  }
}
