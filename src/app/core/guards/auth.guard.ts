import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Authservices } from "../services/authservices";


export const authGuard :CanActivateFn = () => {
  const auth = inject (Authservices);
  const router = inject(Router);

  if(auth.authorize()){
    return true;
  }else{
    return  router.createUrlTree(['login']);   //or use => router.navigate(['login']),;
  }
}
