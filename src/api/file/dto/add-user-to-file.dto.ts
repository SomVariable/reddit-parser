import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { LoginDwarfDto } from "src/api/dwarf/dto/login-dwarf.dto";
import { AddProxyDto } from "./add-proxy.dto";
import { IsOptional, IsString } from 'class-validator';
import { EMPTY_PROXY } from '../constants/file.constants';

export class AddUserToFileDto extends PickType(LoginDwarfDto, ['email', 'login', 'password']){
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    proxy: string = EMPTY_PROXY
}
