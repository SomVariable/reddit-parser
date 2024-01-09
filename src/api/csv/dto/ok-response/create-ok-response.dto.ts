import { ApiProperty } from "@nestjs/swagger";

export class CreateOkResponse {
    @ApiProperty({
        example: 'return file: 123214.csv'
    })
    file: string
}