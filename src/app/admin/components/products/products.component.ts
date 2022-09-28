import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    this.httpClientService.get({
      controller: "products"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();


    // this.httpClientService.put({
    //   controller: "products",
    // }, {
    //   id: "09c1717d-35e9-4867-9073-02b5bc900e60",
    //   name: "Renkli Kağıt",
    //   stock: 1500,
    //   price: 5.5
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // }, "7ec9efba-8584-4df5-9685-55b5d5df3d4a").subscribe();

    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => {

    });
  }
}
