import { CanActivateFn} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
 export class PermissionsService {

 constructor(private auth: AuthService, private router: Router, private toast: NgToastService) { }

 canActivate(): boolean {
  if(this.auth.isLoggedIn()){
    return true
  }
  else{
    this.toast.error({detail: "ERROR", summary:"Please Login First!"});
    this.router.navigate(['login'])
    return false;
  }
 }
}

export const authGuard: CanActivateFn = (route,state) => {
  return inject(PermissionsService).canActivate();
}

  