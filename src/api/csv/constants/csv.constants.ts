import { CsvRowFileFormat } from '../types/csv.types';
import * as path from 'path'

export const CSV_FILE_PATH = 'payload/output.csv';
export const HEADERS = `${CsvRowFileFormat.subreddit};${CsvRowFileFormat.tag};${CsvRowFileFormat.flair};${CsvRowFileFormat.AdditionalInfo};${CsvRowFileFormat.postCount};${CsvRowFileFormat.from};${CsvRowFileFormat.to}`;
export const TEMP_PATH = path.join(__dirname, '../') 