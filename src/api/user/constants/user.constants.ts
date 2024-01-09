export const VIEW_PORT_SETTING = { width: 1280, height: 700 }
export const ACTIVITY_INTERVAL = 5000

export enum UserActionWeight {
    highFrequency = 20,
    mediumFrequency = 7,
    lowFrequency = 1
}

export enum USER_BAD_REQUEST_EXCEPTION {
    CREATE_EXISTING_ACTIVITY = "there is already exist activity for this user",
    MISSING_ACTIVITY = "there no activity for this user",
    MISSING_USERS_EMAILS = 'You need choose some emails for running users',
    BULL_MISSING_DATA_LOGIN = "there is problem with bull data for login",
    BULL_MISSING_LOGGED_IN_USER = "",
}

export enum USER_INTERNAL_SERVER_EXCEPTION {
    
}

export enum USER_SELECTORS {
    LOGIN = "#login-username",
    PASSWORD = "#login-password",
    LOGIN_BUTTON = "#login-button",
    HOME_BUTTON = "#SHORTCUT_FOCUSABLE_DIV > div:nth-child(2) > header > div > div._3dnbqz69WJTFCss8wl7Wlk > div._3jiriKeNer8y0-1r6oWIFM._3rS8YTDjcT7fs0k9W4rxDG > button",
    FILTER_COMMUNITY = "#header-subreddit-filter",
    MODER_COMMUNITY = "a[id^='focus-modt5']",
    YOUR_COMMUNITY = "a[id^='focus-subt5']",
    BLACK_WINDOW = "#SHORTCUT_FOCUSABLE_DIV > div:nth-child(7) > div"
}

export enum USER_BULL {
    NAME = 'user',
    LOGIN = 'login-user',
    EMIT_ACTIVITY = 'emit-activity',
    CSV_ACTION = 'csv-action'
}

export const USER_RETURN_EXAMPLE = {"email":"valhodisevil@gmail.com","login":"Temporary-Scholar825","password":"LestTryItPlease123!@#","proxy":"127.0.0.1:80"}
export const USERS_RETURN_EXAMPLE =[USER_RETURN_EXAMPLE, USER_RETURN_EXAMPLE, USER_RETURN_EXAMPLE, '...n']