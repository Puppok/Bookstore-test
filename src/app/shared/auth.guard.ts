import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private router: Router) {}

    loadToken() {
        return localStorage.getItem('Token')
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.loadToken()) {
            return true
        } else {
            this.router.navigateByUrl('/auth')
            return false
        }
    }

}