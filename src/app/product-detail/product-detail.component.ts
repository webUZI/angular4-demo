import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Product , ProductService ,Comment} from '../shared/product.service'

@Component ({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product ;

  comments: Comment[];

  newRating: number = 5;
  newComment: string = "";
  isCommentHidden: boolean = true;
  constructor(
    private routerInfo: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    //获取传过来对应id商品的详情
    let productId: number = this.routerInfo.snapshot.params['productId'];
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommerntsForProductId(productId);
  }
  //增加评论
  addComment() {
    if( this.newComment ) {
      let comment = new Comment( 1, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
      this.comments.unshift(comment);

      //求平均评星数值
      let sum = this.comments.reduce(( sum, comments) => sum+comments.rating ,0);
      this.product.rating = sum/this.comments.length;

      this.newComment = null;
      this.newRating = 5;
      this.isCommentHidden = true;
    }  
  }
}
