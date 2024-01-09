import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DwarvesLetsGetToWorkDto {
    @ApiProperty()
    @IsString({ each: true})
    @IsNotEmpty()
    emails: string[]
}