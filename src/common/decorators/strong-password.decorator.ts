import { registerDecorator, ValidationOptions } from 'class-validator';

export function StrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'strongPassword',
      target: object?.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const passwordRegex =
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
          if (!passwordRegex.test(value)) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return 'password too weak';
        },
      },
    });
  };
}
