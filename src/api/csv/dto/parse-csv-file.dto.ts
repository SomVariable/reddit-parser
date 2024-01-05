import { ApiProperty } from "@nestjs/swagger";


export class ParseCSVFileDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File
}