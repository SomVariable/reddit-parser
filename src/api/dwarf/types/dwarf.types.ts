export enum DwarfActionWeight {
    highFrequency = 20,
    mediumFrequency = 7,
    lowFrequency = 1
}

export enum DWARF_BAD_REQUEST_EXCEPTION {
    CREATE_EXISTING_ACTIVITY = "there is already exist activity for this user",
    MISSING_ACTIVITY = "there no activity for this user"
}

export enum DWARF_SELECTORS {
    LOGIN = "#login-username",
    PASSWORD = "#login-password",
    LOGIN_BUTTON = "#login-button",
    HOME_BUTTON = "#SHORTCUT_FOCUSABLE_DIV > div:nth-child(2) > header > div > div._3dnbqz69WJTFCss8wl7Wlk > div._3jiriKeNer8y0-1r6oWIFM._3rS8YTDjcT7fs0k9W4rxDG > button",
    FILTER_COMMUNITY = "#header-subreddit-filter",
    MODER_COMMUNITY = "a[id^='focus-modt5']",
    YOUR_COMMUNITY = "a[id^='focus-subt5']",
    BLACK_WINDOW = "#SHORTCUT_FOCUSABLE_DIV > div:nth-child(7) > div"
}

export type DwarfAction = {
    fn: (...args: any) => void,
    weight: number
}

export interface IDwarfActions {
    scrollByWheel: DwarfAction
    doNothing: DwarfAction
    goToTheCommunity: DwarfAction
}