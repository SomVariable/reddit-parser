import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class BrowserSessionDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string 
}