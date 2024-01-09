import { ApiProperty } from "@nestjs/swagger";
import { USERS_RETURN_EXAMPLE } from "../../constants/user.constants";

export class UserReturnOkResponseDto {
    @ApiProperty({example: USERS_RETURN_EXAMPLE})
    data: any
}