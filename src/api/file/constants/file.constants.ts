export enum FILE_NAME {
    ACCOUNTS = '2.1 Аккаунты для авторизации.txt',
    PROXY = '1.3 Список прокси.txt',
    LOGGED_IN_ACCOUNTS = '3.1 Залогиненные аккаунты.txt',
    FROZEN_ACCOUNTS = '1.4 Замороженные аккаунты.txt'
}

export enum FILE_INTERNAL_SERVER_ERROR_EXCEPTION {
    USER_DUPLICATE = 'there is more than one user in the ',
    WRONG_PROXY_FORMAT = 'there is problem with proxy'
}

export const EMPTY_PROXY = 'no-proxy'
