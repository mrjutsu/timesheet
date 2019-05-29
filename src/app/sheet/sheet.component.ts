import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  rows = [
    { date: undefined,
      start_time: undefined,
      end_time: undefined,
      regular_hours: undefined,
      total_hours: undefined
    }
  ];

  total_hours = 0;

  // @Input() rows = [
  //   { date: undefined,
  //     start_time: undefined,
  //     end_time: undefined,
  //     regular_hours: undefined,
  //     total_hours: undefined
  //   }
  // ];

  constructor() { }

  ngOnInit() {
  }

}
