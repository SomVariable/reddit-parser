import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { CSV_FILE_PATH } from './constants/csv.constants';
import * as iconv from 'iconv-lite';

@Injectable()
export class CsvService {
  async parseCsvFile() {
    try {
      const fileStream = fs.createReadStream(CSV_FILE_PATH);

      const converterStream = iconv.decodeStream('win1251');
      return new Promise((resolve, reject) => {
        fileStream.pipe(converterStream)
          .pipe(csv({ separator: ';' }))
          .on('data', (data) => resolve(data))
          .on('end', () => {
            console.log('end');
            return true;
          })
          .on('error', (error) => reject(error));
      });
    } catch (error) {
      console.log(error);
    }
  }
}
