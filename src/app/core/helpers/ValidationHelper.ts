import {FormArray, FormGroup} from '@angular/forms';
import * as moment from 'moment';

/**
 * show error on second date field if it is lower than first date
 */
export function secondDateGreaterThanFirstDate(firstDateControlName: string, secondDateControlName: string) {
  return (formGroup: FormGroup) => {
    const firstDateDateControl = formGroup.controls[firstDateControlName];
    const secondDateControl = formGroup.controls[secondDateControlName];

    if (moment(secondDateControl.value).isBefore(moment(firstDateDateControl.value).add('1', 'days'))) {
      secondDateControl.setErrors({isBefore: true});
    }

  };
}
