import { PickType } from '@nestjs/swagger';
import { UpdateSessionDto } from './update-session.dto';

export class UpdateVerifyDto extends PickType(UpdateSessionDto, [
  'verificationKey',
  'verificationTimestamp',
]) {}
