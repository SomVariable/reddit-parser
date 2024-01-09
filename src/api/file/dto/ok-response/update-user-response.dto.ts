import { ApiProperty } from "@nestjs/swagger";
import { UPDATED_USERS_EXAMPLE } from "../../constants/file.constants";

export class UpdateUserResponseDto {
    @ApiProperty({example: UPDATED_USERS_EXAMPLE})
    data: string[]
} 