export enum FILE_NAME {
    ACCOUNTS = '2.1 Аккаунты для авторизации.txt',
    PROXY = '1.3 Список прокси.txt',
    LOGGED_IN_ACCOUNTS = '3.1 Залогиненные аккаунты.txt',
    FROZEN_ACCOUNTS = '1.4 Замороженные аккаунты.txt',
}

export enum FILE_BAD_REQUEST_ERRORS {
    MISSING_FILE = 'no such file in the FILE_NAME',
    MISSING_DTO = 'missing data' 
}

export enum FILE_INTERNAL_SERVER_ERROR {
    USER_DUPLICATE = 'user duplicated. Check it',
    WRONG_PROXY_FORMAT = 'problem with proxy'
}

export enum FILE_PATH {
    CONTENT = 'payload/Content',
    TEMP = 'payload/Content/Temp',
    REPORT = 'payload/Content/Report'
}

export const EMPTY_PROXY = 'no-proxy'
