import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { LoginUserDto } from "src/api/user/dto/login-user.dto";
import { AddProxyDto } from "./add-proxy.dto";
import { IsOptional, IsString } from 'class-validator';
import { EMPTY_PROXY } from '../constants/file.constants';

export class AddUserToFileDto extends PickType(LoginUserDto, ['email', 'login', 'password']){
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    proxy: string = EMPTY_PROXY
}
