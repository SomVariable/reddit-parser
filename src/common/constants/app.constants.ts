export enum APP_ERRORS {}

export enum BAD_REQUEST_ERRORS {
  FORBIDDEN = 'You do not have access',
}

export enum PROPERTY_LENGTH {
  TITLE = 30,
  SMALL_DESCRIPTION = 100,
  DESCRIPTION = 200,
}

export const REDDIT_SRC= 'https://www.reddit.com/'
export const TRANSLATION_ROUTE_WITH_ID = ':id/translation/:langCode';
export const UNIQUE_MESSAGE = {
  statusCode: 409,
  message: '[P2002]: Unique constraint failed on the (not available)',
};
