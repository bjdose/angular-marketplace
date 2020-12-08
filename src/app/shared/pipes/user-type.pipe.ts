import { Pipe, PipeTransform } from '@angular/core';
import { UserType } from '@app/core/enums';

@Pipe({
  name: 'appUserType',
})
export class UserTypePipe implements PipeTransform {
  transform(userType: UserType | undefined): any {
    if (!userType) {
      return '';
    }
    return UserType[userType];
  }
}
