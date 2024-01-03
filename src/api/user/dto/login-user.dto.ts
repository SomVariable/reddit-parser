import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    login: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

}
