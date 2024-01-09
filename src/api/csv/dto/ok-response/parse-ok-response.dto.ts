import { ApiProperty } from "@nestjs/swagger";
import { PARSED_DATA_EXAMPLE } from "../../constants/csv.constants";
import { CsvRow } from "../../types/csv.types";
import { CreateCsvFile } from "../create-csv-file.dto";

export class ParseOkResponse {
    @ApiProperty({
        type: CreateCsvFile,
        example: PARSED_DATA_EXAMPLE
    })
    data: CreateCsvFile
}