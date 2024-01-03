import { PartialType, PickType } from "@nestjs/swagger";
import { AddUserToFileDto } from "./add-user-to-file.dto";

export class UpdateFileUser extends PickType(PartialType(AddUserToFileDto), ['login', 'password', 'proxy']) {}