import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResopnse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callbackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResopnse> = this.httpClientService.post<any | TokenResopnse>({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password })

    const tokenResponse: TokenResopnse = await firstValueFrom(observable) as TokenResopnse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Kullanıcı girişi başarılı.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      })
    }
    callbackFunction();
  }
}
