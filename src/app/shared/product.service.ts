import { Injectable , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService implements OnInit {
    constructor(private http: HttpClient) {}
    ngOnInit() {}

    getAllCategories(): any[] {
        return ['电子产品', '图书', '硬件设备'];
    }

    getProducts(): Observable<any> {
        return this.http.get('/poppp/product').map(res => res);
    }

    getProduct(id: number): Observable<any> {
        return this.http.get('/poppp/product/' + id).map(res => res);
    }

    getCommerntsForProductId(id: number): Observable<any> {
        return this.http.get('/poppp/product/' + id + '/Comments').map(res => res);
    }
}
export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {}
}
export class Comment {
    constructor(
        public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string
    ) {}
}
