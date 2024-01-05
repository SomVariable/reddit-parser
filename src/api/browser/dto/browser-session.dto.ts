import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class BrowserSessionDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string 
}