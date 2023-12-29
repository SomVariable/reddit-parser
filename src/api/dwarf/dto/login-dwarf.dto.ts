import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"


export class LoginDwarfDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nickname: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}
