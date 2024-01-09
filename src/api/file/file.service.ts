import * as fs from 'fs/promises';
import * as path from 'path';
import * as iconv from 'iconv-lite';
import type { Response } from 'express';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BackupService } from './../backup/backup.service';
import { createReadStream, createWriteStream } from 'fs';
import {
  FILE_BAD_REQUEST_ERRORS,
  FILE_INTERNAL_SERVER_ERROR,
  FILE_NAME,
  FILE_PATH,
} from './constants/file.constants';
import { AddUserToFileDto } from './dto/add-user-to-file.dto';
import { FileUser } from './types/file.types';
import { AddProxyDto } from './dto/add-proxy.dto';
import { UpdateFileUser } from './dto/update-file-user.dto';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';
import { AddReportDto } from './dto/add-report.dto';
import { AddTempDto } from './dto/add-temp.dto';

@Injectable()
export class FileService {
  constructor(private readonly backupService: BackupService) {}

  async parseTagFile(fileName: string) {
    const fileDir = path.join(
      process.cwd(),
      'payload/Content/Titles',
      `${fileName}.txt`,
    );
    console.log(fileDir);
    const fileInfo = await fs.readFile(fileDir, 'utf-8');
    const fileData = fileInfo.split('\r\n');

    return fileData[Math.floor(Math.random() * fileData.length)];
  }

  async updateUserFileData(email: string, updateData: UpdateFileUser) {
    const users = await this.getUsersData();
    const usersWithUpdateUser = users.map((el) => {
      if (el.email === email) {
        return {
          ...el,
          ...updateData,
        };
      } else {
        return el;
      }
    });
    const userFileFormat = this._usersFormatToFile(usersWithUpdateUser);

    await fs.writeFile(`payload/${FILE_NAME.ACCOUNTS}`, userFileFormat);

    return userFileFormat;
  }

  async getUsersData() {
    const fileFormatUsers = await fs.readFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      'utf-8',
    );
    const users = this._fileFormatToArray(fileFormatUsers);

    return users;
  }

  async getUsersEmails() {
    const fileFormatUsers = await fs.readFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      'utf-8',
    );
    const users = this._fileFormatToArray(fileFormatUsers);

    return users.map(user => user.email);
  }

  async getUserData({ email, ...dto }: BrowserSessionDto) {
    const fileFormatUsers = await fs.readFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      'utf-8',
    );
    const users = this._fileFormatToArray(fileFormatUsers);
    const user = users.filter((user) => user.email === email);

    if (user.length > 1) {
      throw new InternalServerErrorException(
        FILE_INTERNAL_SERVER_ERROR.USER_DUPLICATE,
      );
    }
    return user[0];
  }

  async addNewUser(newUser: AddUserToFileDto) {
    const usersWithNewUser = await this._addFileInfo(newUser, 'ACCOUNTS');

    return usersWithNewUser;
  }

  async addLoggedInUser(newUser: AddUserToFileDto) {
    const usersWithNewUser = await this._addFileInfo(
      newUser,
      'LOGGED_IN_ACCOUNTS',
    );

    return usersWithNewUser;
  }

  async addBlockedUser(newUser: AddUserToFileDto) {
    const usersWithNewUser = await this._addFileInfo(
      newUser,
      'FROZEN_ACCOUNTS',
    );

    return usersWithNewUser;
  }

  async addProxyAddress({ proxy }: AddProxyDto) {
    const usersWithNewUser = await this._addFileInfo(proxy, 'PROXY');

    return usersWithNewUser;
  }

  async addReport(dto: AddReportDto) {
    if(await !this._checkReportDir()) {
      await fs.mkdir(path.join(process.cwd(), FILE_PATH.REPORT))
    }

    if(!dto.message) throw new BadRequestException(FILE_BAD_REQUEST_ERRORS.MISSING_DTO)

    const fileName = `${Date.now()}.txt`
    await fs.writeFile(path.join(FILE_PATH.REPORT, fileName), dto.message)
  }

  async addTemp(dto: AddTempDto) {
    if(await !this._checkTempDir()) {
      await fs.mkdir(path.join(process.cwd(), FILE_PATH.TEMP))
    }

    if(!dto.message) throw new BadRequestException(FILE_BAD_REQUEST_ERRORS.MISSING_DTO)

    const fileName = `${Date.now()}.txt`
    await fs.writeFile(path.join(FILE_PATH.TEMP, fileName), dto.message)
  }

  parseProxy(proxy: string) {
    const _ = proxy.split(':');

    if (_.length !== 2) {
      throw new InternalServerErrorException(
        FILE_INTERNAL_SERVER_ERROR.WRONG_PROXY_FORMAT,
      );
    }

    return {
      proxy: _[0],
      port: _[1],
    };
  }

  private async _checkReportDir() {
    return !!(await fs
      .stat(path.join(process.cwd(), FILE_PATH.REPORT))
      .catch((e) => false));
  }

  private async _checkTempDir() {
    return !!(await fs
      .stat(path.join(process.cwd(), FILE_PATH.TEMP))
      .catch((e) => false));
  }

  private async _addFileInfo(data: any, fileName: keyof typeof FILE_NAME) {
    switch (fileName) {
      case 'ACCOUNTS':
      case 'LOGGED_IN_ACCOUNTS':
      case 'FROZEN_ACCOUNTS':
        {
          const fileStream = createWriteStream(
            path.join(process.cwd(), 'payload', FILE_NAME[fileName]),
            {
              flags: 'a',
              encoding: 'utf-8',
            },
          );
          const newData = this._userFormatToFile(data);

          fileStream.write('\r\n' + newData);
          fileStream.end();
        }
        break;
      case 'PROXY':
        {
          const fileStream = createWriteStream(
            path.join(process.cwd(), 'payload', FILE_NAME[fileName]),
            {
              flags: 'a',
              encoding: 'utf-8',
            },
          );

          fileStream.write('\r\n' + data);
          fileStream.end();
        }
        break;
      default: {
        throw new BadRequestException(FILE_BAD_REQUEST_ERRORS.MISSING_FILE);
      }
    }
  }

  private _fileFormatToArray(fileFormat: string) {
    const usersStringData: string[] = fileFormat.split('\r\n');
    const users: FileUser[] = usersStringData.map((userData) => {
      const arrayData = userData.split(';');

      return {
        email: arrayData[0],
        login: arrayData[1],
        password: arrayData[2],
        proxy: arrayData[3],
      };
    });
    return users;
  }

  private _usersFormatToFile(users: FileUser[]) {
    return users.map((user: FileUser, userId: number) => {
      if (userId !== users.length - 1) {
        return `${this._userFormatToFile(user)}\r\n`;
      } else {
        return this._userFormatToFile(user);
      }
    });
  }

  private _userFormatToFile({ email, login, password, proxy }: FileUser) {
    return `${email};${login};${password};${proxy}`;
  }
}
