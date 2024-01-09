import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddReportDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string
}