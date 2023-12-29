import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

export const validateFile = {
  validators: [
    new MaxFileSizeValidator({ maxSize: 500000 }),
  ],
};
