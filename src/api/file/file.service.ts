import { BackupService } from './../backup/backup.service';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddUserToFileDto } from './dto/add-user-to-file.dto';
import * as fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { FILE_INTERNAL_SERVER_ERROR_EXCEPTION, FILE_NAME } from './constants/file.constants';
import * as iconv from 'iconv-lite';
import type { Response } from 'express';
import { FileUser } from './types/file.types';
import { AddProxyDto } from './dto/add-proxy.dto';
import { UpdateFileUser } from './dto/update-file-user.dto';
import { BrowserSessionDto } from '../browser/dto/browser-session.dto';

@Injectable()
export class FileService {
  constructor(private readonly backupService: BackupService) {}

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
    const usersString = this._fileFormatToArray(fileFormatUsers);

    return usersString;
  }

  async getUserData({ email, ...dto }: BrowserSessionDto) {
    const fileFormatUsers = await fs.readFile(
      `payload/${FILE_NAME.ACCOUNTS}`,
      'utf-8',
    );
    const users = this._fileFormatToArray(fileFormatUsers);
    const user = users.filter((user) => user.email === email);

    if (user.length > 1) {
      throw new InternalServerErrorException(FILE_INTERNAL_SERVER_ERROR_EXCEPTION.USER_DUPLICATE)
    } 
    return user[0];
  }

  async addNewUser(newUser: AddUserToFileDto) {
    const dwarfsWithNewUser = await this._addFileInfo(newUser, 'ACCOUNTS');

    return dwarfsWithNewUser;
  }

  async addLoggedInUser(newUser: AddUserToFileDto) {
    const dwarfsWithNewUser = await this._addFileInfo(
      newUser,
      'LOGGED_IN_ACCOUNTS',
    );

    return dwarfsWithNewUser;
  }

  async addBlockedUser(newUser: AddUserToFileDto) {
    const dwarfsWithNewUser = await this._addFileInfo(
      newUser,
      'FROZEN_ACCOUNTS',
    );

    return dwarfsWithNewUser;
  }

  async addProxyAddress({ proxy }: AddProxyDto) {
    const dwarfsWithNewUser = await this._addFileInfo(proxy, 'PROXY');

    return dwarfsWithNewUser;
  }

  parseProxy(proxy: string) {
    const _ = proxy.split(':') 
    
    if(_.length !== 2) {
      throw new InternalServerErrorException(FILE_INTERNAL_SERVER_ERROR_EXCEPTION.WRONG_PROXY_FORMAT)
    }

    return {
      proxy: _[0],
      port: _[1]
    }
  }

  private async _addFileInfo(data: any, fileName: keyof typeof FILE_NAME) {
    switch (fileName) {
      case 'ACCOUNTS':
      case 'LOGGED_IN_ACCOUNTS':
      case 'FROZEN_ACCOUNTS':
        {
          const fileStream = createWriteStream(
            `payload/${FILE_NAME[fileName]}`,
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
            `payload/${FILE_NAME[fileName]}`,
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
        throw new BadRequestException('there is no such file in the FILE_NAME');
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
