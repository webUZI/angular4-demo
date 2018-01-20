import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {LoadingBarService} from './share/loading-bar/loading-bar.service';

@Injectable()
export class CustomHttp extends Http {
  timer: Array<any> = [];
  count = 0;
  sum = 0;
  constructor(
      backend: ConnectionBackend,
      defaultOptions: RequestOptions,
      private loading: LoadingBarService
  ) {
      super(backend, defaultOptions);
  }
    request(url: string | Request, options ?: RequestOptionsArgs): Observable < Response > {
        // 每多一个请求加一个定时器
        // this.timer.push(setTimeout(() => {
        //     this.loading.open();
        // }, 50));
        this.loading.open();
        this.count++;
        return this.intercept(super.request(url, options));
    }

    get(url: string, options ?: RequestOptionsArgs): Observable < Response > {
        return this.intercept(
          super.get(url, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(this.handleError(error.status)))
        );
    }

    post(url: string, body: string, options ?: RequestOptionsArgs): Observable < Response > {
        return this.intercept(
          super.post(url, body, this.getRequestOptionArgs(options))
            .map( res => res.json())
            .catch((error: any) => Observable.throw(this.handleError(error.status)))
        );
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable < Response > {
        return this.intercept(
          super.put(url, body, this.getRequestOptionArgs(options))
            .map( res => res.json())
            .catch((error: any) => Observable.throw(this.handleError(error.status)))
        );
    }

    delete(url: string, options ?: RequestOptionsArgs): Observable < Response > {
        return this.intercept(
          super.put(url, this.getRequestOptionArgs(options))
            .map( res => res.json())
            .catch((error: any) => Observable.throw(this.handleError(error.status)))
        );
    }

    getRequestOptionArgs(options ?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    // 拦截器
    intercept(observable: Observable < Response >): Observable < Response > {
        // 返回create创建一个新的可订阅对象observer
        return Observable.create((observer) => {
          observable.subscribe(res => {
            observer.next(res);
          }, (err) => {
            observer.error(err);
          }, () => {
            // 每完成一个请求sum+1,直到所有的请求完成后才清除loading-bar定时器并关闭
            this.sum++;
            if (this.sum === this.count * 2) {
              this.timer.forEach((c, i) => {
                clearTimeout(this.timer[i]);
              });
              this.loading.close();
            }
            observer.complete(); // 注意添加这句，否则有可能一些第三方的包不能正常使用，如ng2-translate
          });
        });
    }

    // 报错状态码
    handleError(status): any {
        if (status === 0) {
          console.log('我进到了0错误,查请求响应错误，请检网络');
            // this.popup.open('查请求响应错误，请检网络');
        } else if (status === 404) {
          console.log('我进到了404错误,请求链接不存在，请联系管理员');
            // this.popup.open('请求链接不存在，请联系管理员');
        } else if (status === 500) {
          console.log('我进到了500错误,服务器出错，请稍后再试');
            // this.popup.open('服务器出错，请稍后再试');
        } else {
          console.log('未知错误，请检查网络');
            // this.popup.open('未知错误，请检查网络');
        }
    }
}

export let providerHttp = ( backend: XHRBackend,
        defaultOptions: RequestOptions,
        loading: LoadingBarService) => new CustomHttp(backend, defaultOptions, loading);

