import { BackupService } from './../backup/backup.service';
import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'fs/promises';
import { FILE_NAME } from './constants/file.constants';
import * as iconv from 'iconv-lite';

@Injectable()
export class FileService {
  constructor(private readonly backupService: BackupService) {}

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async getUserData() {
    const usersData = await fs.readFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      'utf8',
    );

    return JSON.parse(usersData);
  }

  async setNewUser(newUser) {
    const usersDataJson = await fs.readFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      'utf8',
    );
    console.log(usersDataJson);
    await this.backupService.backupAccounts(usersDataJson, FILE_NAME.ACCOUNTS);
    const userData = await JSON.parse(usersDataJson);
    const userDataWithNewUser = [...userData.dwarfs, newUser];
    const userDataWithNewUserJson = JSON.stringify(
      { dwarfs: userDataWithNewUser },
      null,
      2,
    );

    await fs.writeFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      userDataWithNewUserJson,
    );
    return userDataWithNewUser;
  }

  async test() {
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

    await fs.writeFile('./output.csv', csvBuffer);
    return true;
  }
}
