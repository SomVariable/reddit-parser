export enum FILE_NAME {
  ACCOUNTS = '2.1 Аккаунты для авторизации.txt',
  PROXY = '1.3 Список прокси.txt',
  LOGGED_IN_ACCOUNTS = '3.1 Залогиненные аккаунты.txt',
  FROZEN_ACCOUNTS = '1.4 Замороженные аккаунты.txt',
}

export enum FILE_BAD_REQUEST_ERRORS {
  MISSING_FILE_NAME = 'no such file-name in the FILE_NAME list',
  MISSING_DTO = 'missing data',
  MISSING_FILE = 'missing file',
}

export enum FILE_INTERNAL_SERVER_ERROR {
  USER_DUPLICATE = 'user duplicated. Check it',
  WRONG_PROXY_FORMAT = 'problem with proxy',
}

export enum FILE_PATH {
  CONTENT = 'payload/Content',
  TEMP = 'payload/Content/Temp',
  REPORT = 'payload/Content/Report',
}

export const EMPTY_PROXY = 'no-proxy';

export const USERS_DATA_EXAMPLE = [
    {
      email: 'valhodisevil@gmail.com',
      login: 'Temporary-Scholar825',
      password: 'LestTryItPlease123!@#',
      proxy: '127.0.0.1:80',
    },
    {
      email: 'somevariable787898@gmail.com',
      login: 'Leading-Subject-4672',
      password: 'LestTryItPlease123!@#',
      proxy: '127.0.0.1:80',
    },
    {
      email: 'new-one@gmail.com',
      login: 'new-cool-login_4',
      password: 'new-cool-password_4',
      proxy: 'no-proxy',
    },
    {
      email: 'new-one_2@gmail.com',
      login: 'new-one_2',
      password: 'test',
      proxy: 'no-proxy',
    },
  ];
  
export const USERS_EMAILS_EXAMPLE =  [
    'valhodisevil@gmail.com',
    'somevariable787898@gmail.com',
    'new-one@gmail.com',
    'new-one_2@gmail.com',
  ]
;
export const UPDATED_USERS_EXAMPLE = [
    'valhodisevil@gmail.com;Temporary-Scholar825;LestTryItPlease123!@#;127.0.0.1:80\r\n',
    'somevariable787898@gmail.com;Leading-Subject-4672;LestTryItPlease123!@#;127.0.0.1:80\r\n',
    'new-one@gmail.com;new-cool-login_4;new-cool-password_4;no-proxy\r\n',
    'new-one_2@gmail.com;string;string;string',
  ]
;
