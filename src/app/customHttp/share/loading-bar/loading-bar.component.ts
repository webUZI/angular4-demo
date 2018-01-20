import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  show  = false;
  timer;
  constructor() {
    console.log('daying1211');
    LoadingBarService.loading = this;
  }

  ngOnInit() {
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
