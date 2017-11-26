import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  private rating: number;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  private stars: boolean[];

  @Input()
  private readonly: boolean = true;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = [];
    for ( let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
    console.log(this.stars);
  }

  ngOnInit() {}

  clickStar(index: number) {
    if( !this.readonly ) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
