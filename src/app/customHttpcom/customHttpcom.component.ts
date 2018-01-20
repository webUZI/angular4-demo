import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Http } from '@angular/http';
import {AngularLoadingBarService} from 'ng4-loader-bar';

@Component({
  selector: 'app-customhttpcom',
  templateUrl: './customHttpcom.component.html',
  styleUrls: ['./customHttpcom.component.css']
})
export class CustomHttpcomComponent implements OnInit {

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private angularLoadingBarService: AngularLoadingBarService
  ) { }
  color = '#00f'
  ngOnInit() {
    /*this.http.post('/poppp/sys/userAssign/getListData', {'name': ''}).subscribe( res => {
      console.log('res', res);
    });*/
    this.longRequest();
  }
  longRequest() {
    const request = new HttpRequest(
      'POST', '/poppp/sys/userAssign/getListData', {},
      {reportProgress: true});

    this.httpClient.request(request)
      .subscribe(
        event => {
          if (event.type === HttpEventType.DownloadProgress) {
            console.log('Download progress event', event);
          }
          if (event.type === HttpEventType.UploadProgress) {
            console.log('Upload progress event', event);
          }
          if (event.type === HttpEventType.Response) {
            console.log('response received...', event);
          }
        }
      );
  }
    startLoadingBar() {
      this.angularLoadingBarService.start();
    }

    stopLoadingBar() {
      this.angularLoadingBarService.stop();
    }

    completeLoadingBar() {
      this.angularLoadingBarService.complete();
    }
}
