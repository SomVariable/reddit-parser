import { ApiProperty } from "@nestjs/swagger";
import { USERS_EMAILS_EXAMPLE } from "../../constants/file.constants";

export class GetUsersEmailsResponseDto {
    @ApiProperty({example: USERS_EMAILS_EXAMPLE})
    data: string[]
} 