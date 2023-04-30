import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private jwtJelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinnerService: NgxSpinnerService) {


  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinnerService.show(SpinnerType.BallAtom);
    const token: string = localStorage.getItem("accessToken");

    // const decodeToken = this.jwtJelper.decodeToken(token);
    // const expirationDate: Date = this.jwtJelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtJelper.isTokenExpired(token)
    } catch {
      expired = true;
    }

    if (!token || expired) {
      this.router.navigate(["login"], { queryParams: { returlUrl: state.url } });
      this.toastrService.message("Oturum açmanız zorunludur.", "Yetkisiz Erişim", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }

    this.spinnerService.hide(SpinnerType.BallAtom);
    return true;
  }

}
