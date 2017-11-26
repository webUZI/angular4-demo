import { Injectable , OnInit} from '@angular/core'

@Injectable()
export class ProductService implements OnInit {
    private products: Product[] = [
      new Product(1, '第一个商品', 1.99, 1.5, '这是第一个商品的描述,这是我在学习angular的实战', ['电子产品']),
      new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品的描述,这是我在学习angular的实战', ['电子产品']),
      new Product(3, '第三个商品', 3.99, 3.5, '这是第三个商品的描述,这是我在学习angular的实战', ['电子产品']),
      new Product(4, '第四个商品', 4.99, 3.5, '这是第四个商品的描述,这是我在学习angular的实战', ['电子产品']),
      new Product(5, '第五个商品', 5.99, 1, '这是第五个商品的描述,这是我在学习angular的实战', ['电子产品']),
      new Product(6, '第六个商品', 6.99, 2, '这是第六个商品的描述,这是我在学习angular的实战', ['电子产品'])
    ];
    private comments: Comment[] = [
        new Comment(1, 1, '2017-11-25 11:36:10', '张三', 3, '这是第一件商品的评论信息'),
        new Comment(2, 1, '2017-11-25 11:36:10', '张四', 3, '这是第二件商品的评论信息'),
        new Comment(3, 1, '2017-11-25 11:36:10', '张五', 3, '这是第三件商品的评论信息'),
        new Comment(4, 4, '2017-11-25 11:36:10', '张六', 3, '这是第四件商品的评论信息'),
    ]
    constructor() {}
    ngOnInit() {}

    getProducts(): Product[] {
        return this.products;
    }

    getProduct(id: number): Product {
        return this.products.find((Product) =>Product.id == id);
    }

    getCommerntsForProductId(id: number): Comment[] {
        return this.comments.filter((comment: Comment) => comment.productId == id);
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
 