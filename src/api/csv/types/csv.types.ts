export interface CsvRow {
  subreddit: string;
  tag: string;
  flair: string;
  comment: string;
  AdditionalInfo: string;
  postCount: string;
  from: string;
  to: string;
}

export interface CsvFileFormatRow {
  'Сабредит': string;
  'Тег': string;
  'Флейр': string;
  'Комментарий': string;
  'Дополнение в конце заголовка / титула': string;
  'Огр на кол-во постов в сутки': string;
  'Апвоут, от': string;
  'Апвоут, до': string;
}

export enum CsvRowFileFormat {
  subreddit = 'Сабредит',
  tag = 'Тег',
  flair = 'Флейр',
  comment = 'Комментарий',
  AdditionalInfo = 'Дополнение в конце заголовка / титула',
  postCount = 'Огр на кол-во постов в сутки',
  from = 'Апвоут, от',
  to = 'Апвоут, до',
}
