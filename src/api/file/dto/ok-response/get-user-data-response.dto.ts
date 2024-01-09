import { FileUser } from './../../types/file.types';
import { ApiProperty } from "@nestjs/swagger";
import { USERS_DATA_EXAMPLE } from "../../constants/file.constants";

export class GetUsersDataResponseDto {
    @ApiProperty({example: USERS_DATA_EXAMPLE})
    data: FileUser[]
} 