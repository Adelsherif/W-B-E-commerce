import { CanDeactivateFn } from '@angular/router';
import { Register } from '../../pages/register/register';

export const askGuardGuard: CanDeactivateFn<Register> = (component, currentRoute, currentState, nextState) => {
  console.log(component);
  console.log(nextState);
console.log(currentRoute);
 if (component.isSubmitted) {
    return true;
  }

  if(component.allData.valid){

    const alert = window.confirm('You Will lose all data.')
    return alert;
  }
  else{
    return true;
  }

};
