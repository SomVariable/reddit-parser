import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFile, unlink } from 'fs/promises';
import * as csv from 'csv-parser';
import {join} from 'path'
import { CSV_FILE_PATH, HEADERS, TEMP_PATH } from './constants/csv.constants';
import * as iconv from 'iconv-lite';
import { CsvFileFormatRow, CsvRow, CsvRowFileFormat } from './types/csv.types';
import { Readable } from 'stream';
import { createObjectCsvWriter } from 'csv-writer';
import { CreateCsvFile } from './dto/create-csv-file.dto';

@Injectable()
export class CsvService {
  async parseCsvFile(file: Express.Multer.File) {
    try {
      const converterStream = iconv.decodeStream('utf8');
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

  async createCsvFromJson({ rows }: CreateCsvFile) {
    const filePath = join(TEMP_PATH, `${Date.now()}.csv`)
    try {
      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: Object.keys(CsvRowFileFormat).map(prop => {
          return {
            id: prop, title: CsvRowFileFormat[prop]
          }
        }),
        fieldDelimiter: ';',
        encoding: 'utf8',
      }); 
      await csvWriter.writeRecords(rows)
      const buffer = await readFile(filePath, 'utf8');

      return  Buffer.from(buffer, 'utf8');
    } catch (error) {
      throw new InternalServerErrorException(error?.message)
    } finally {
      await unlink(filePath)
    }
    
  }
}
