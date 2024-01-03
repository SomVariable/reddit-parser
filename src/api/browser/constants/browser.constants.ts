export enum BROWSER_INTERNAL_SERVER_ERRORS {
  CANNOT_START_BROWSER = 'cannot running the browser',
  CANNOT_OPEN_PAGE = 'cannot open the page',
}

export enum BROWSER_BAD_REQUEST_ERRORS {
  MISSING_PAGE = 'there is no pages for this this user. Open it',
  MISSING_BROWSER = 'there is no browser for this user. Open it',
  MISSING_PROXY = 'there is no proxy for this user',
}

export enum BROWSER_SELECTORS {
  HOME_LINK = 'div._3dnbqz69WJTFCss8wl7Wlk > a',
  BUN_HEADER = "#AppRouter-main-content > div > div:nth-child(1) > div > div > h3"
}

export enum BROWSER_BULL_MESSAGES {
  MISSING_BROWSER = "There is a problem with browser, if you started it just wait, server will try repeat this operation after 20 seconds, if you don't - start it for user:",
  MISSING_PAGE = "There is a problem with page, if you started it just wait, server will try repeat this operation after 20 seconds, if you don't - start it for user",
}

export enum BULL {
  NAME = 'browser',
  START_BROWSER_PROCESS = 'start-browser',
  START_PAGE_PROCESS = 'start-page',
}

export const BUN_TEMPLATE_MESSAGE = ""