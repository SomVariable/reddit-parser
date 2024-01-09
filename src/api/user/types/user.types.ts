import { CsvRow } from "src/api/csv/types/csv.types"

export interface IBullCsvActionInputData {
    email: string,
    csvRows: CsvRow[]
}

export type UserAction = {
    fn: (...args: any) => void,
    weight: number
}

export interface IUserActions {
    scrollByWheel: UserAction
    doNothing: UserAction
    goToTheCommunity: UserAction
}