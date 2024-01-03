import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AddProxyDto{
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    proxy: string
}