import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as fsPromise from 'fs/promises';
import * as csv from 'csv-parser';
import { CSV_FILE_PATH } from './constants/csv.constants';
import * as iconv from 'iconv-lite';
import { CsvFileFormatRow, CsvRow, CsvRowFileFormat } from './types/csv.types';
import { Readable } from 'stream';

@Injectable()
export class CsvService {
  async parseCsvFile(file: Express.Multer.File) {
    try {
      const converterStream = iconv.decodeStream('win1251');
      const data: CsvRow[] = [];
      await new Promise((resolve, reject) => {
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream
          .pipe(converterStream)
          .pipe(csv({ separator: ';' }))
          .on('data', (rowCsvFileFormat: CsvFileFormatRow) => {
            const rowCsvFormat: CsvRow = {
              subreddit: rowCsvFileFormat[CsvRowFileFormat.subreddit],
              postCount: rowCsvFileFormat[CsvRowFileFormat.postCount],
              to: rowCsvFileFormat[CsvRowFileFormat.to],
              AdditionalInfo: rowCsvFileFormat[CsvRowFileFormat.AdditionalInfo],
              comment: rowCsvFileFormat[CsvRowFileFormat.comment],
              flair: rowCsvFileFormat[CsvRowFileFormat.flair],
              from: rowCsvFileFormat[CsvRowFileFormat.from],
              tag: rowCsvFileFormat[CsvRowFileFormat.tag],
            };
            data.push(rowCsvFormat);
          })
          .on('end', () => {
            resolve(data);
          })
          .on('error', (error) => reject(error));
      });

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createCsvFromJson() {
    const data = [
      {
        subreddit: 'example1',
        tag: 'tag1',
        flair: 'flair1',
        comment: 'comment1',
        titleSuffix: 'suffix1',
        postsPerDayLimit: 5,
        upvotesRangeFrom: 10,
        upvotesRangeTo: 20,
      },
      {
        subreddit: 'example2',
        tag: 'tag2',
        flair: 'flair2',
        comment: 'comment2',
        titleSuffix: 'suffix2',
        postsPerDayLimit: 3,
        upvotesRangeFrom: 8,
        upvotesRangeTo: 15,
      },
    ];

    const header =
      'Сабредит,Тег,Флейр,Комментарий,Дополнение в конце заголовка / титула,Огр на кол-во постов в сутки,"Апвоут, от","Апвоут, до"';

    const csvContent = `${header}\n${data
      .map(
        (row) =>
          `${row.subreddit},${row.tag},${row.flair},${row.comment},${row.titleSuffix},${row.postsPerDayLimit},${row.upvotesRangeFrom},${row.upvotesRangeTo}`,
      )
      .join('\n')}`;

    const csvBuffer = iconv.encode(csvContent, 'win1251');

    await fsPromise.writeFile('./output.csv', csvBuffer);
    return true;
  }
}
