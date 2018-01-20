import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTitle'
})
export class FilterPipe implements PipeTransform {

  // list商品列表,filterFiled根据商品的哪个字段去过滤(过滤字段是哪个),keyword用户输入的关键字
  transform(list: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return list;
    }
    // 返回true则保留,fieldValue操作过滤的字段
    return list.filter( item => {
      const fieldValue = item[filterField];
      return fieldValue.indexOf(keyword) >=0 ;
    });
  }

}
