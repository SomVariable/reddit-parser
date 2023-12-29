import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { COMMUNITY_TYPE } from "../types/community.types";
import { BrowserSessionDto } from "src/api/browser/dto/browser-session.dto";

export class CreateCommunityDto extends BrowserSessionDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string
    
    @ApiPropertyOptional({
        enum: COMMUNITY_TYPE
    })
    @IsEnum(COMMUNITY_TYPE)
    type: COMMUNITY_TYPE = COMMUNITY_TYPE.PRIVATE

    @ApiPropertyOptional()
    @IsBoolean()
    isNSFM: boolean
}


