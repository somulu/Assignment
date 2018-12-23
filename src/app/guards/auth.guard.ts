import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
	 * Constructor to declare defualt propeties of class.
	 * @param authService - Declare authentication service Object.
	 * @param router - Declare router object.
	 */
  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

	/**
	 * This method execute and check before user access any route, that particular user is authenticated or not.
	 * If User is authenticate this method will return true otherwise, it will return false.
	 * @param state - common route parameter
	 */
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if(localStorage.getItem('currentUser')){
        return true;
      }else{
        this.router.navigate(['/auth/login']);
        return false;
      }
  }


}
