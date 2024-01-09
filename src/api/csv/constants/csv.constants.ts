import { CsvRowFileFormat } from '../types/csv.types';
import * as path from 'path';

export const CSV_FILE_PATH = 'payload/output.csv';
export const HEADERS = `${CsvRowFileFormat.subreddit};${CsvRowFileFormat.tag};${CsvRowFileFormat.flair};${CsvRowFileFormat.AdditionalInfo};${CsvRowFileFormat.postCount};${CsvRowFileFormat.from};${CsvRowFileFormat.to}`;
export const TEMP_PATH = path.join(__dirname, '../');

export enum CSV_BAD_REQUEST_EXCEPTION {
  INVALID_FILE = 'Invalid file',
  ERROR_PARSING_CSV_FILE = 'Error parsing CSV file'
}

export enum CSV_INTERNAL_SERVER_ERROR_EXCEPTION {
  CANNOT_CREATE_FILE = 'Error creating CSV file'
}

export const PARSED_DATA_OBJECT_EXAMPLE = {
  subreddit: 'string',
  postCount: 'string',
  to: 'string',
  AdditionalInfo: 'string',
  comment: 'string',
  flair: 'string',
  from: 'string',
  tag: 'string',
};

export const PARSED_DATA_EXAMPLE = [
  PARSED_DATA_OBJECT_EXAMPLE,
  PARSED_DATA_OBJECT_EXAMPLE,
  '...n'
];
