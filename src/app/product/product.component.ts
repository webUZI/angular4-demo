import { Component, OnInit } from '@angular/core';
import { ProductService , Product} from '../shared/product.service';

import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx'
import 'rxjs/Rx'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
   products: Observable<Product[]>;

  //前端过滤方法
  //  keyword: string;
  //  titleFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) {
    //前端过滤方法
    //订阅数据流,debounceTime当用户持续输入的时候不去发射数据流,再等用户停止输入500毫秒才去发射
    //this.titleFilter.valueChanges.debounceTime(500).subscribe(value =>this.keyword=value);
    //this.titleFilter.valueChanges.subscribe(value =>this.keyword=value);
   }

  ngOnInit() {
    this.products = this.productService.getProducts();
   }

}

