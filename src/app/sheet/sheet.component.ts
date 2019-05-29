import { Component, OnInit, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit, DoCheck {

  now = moment();
  maxDate = { day: this.now.toObject().date, month: this.now.toObject().months, year: this.now.toObject().years };

  rows: any = [
    { date: undefined,
      start_time: { hour: 12, minute: 0 },
      end_time: { hour: 12, minute: 0 },
      regular_hours: undefined,
      total_hours: undefined,
      hours: ''
    }
  ];

  total_hours: any = 0;

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(){
    for (let row of this.rows) {
      if (row.date && row.start_time && row.end_time){
        this.calculateRow(row);
      }
    }
  }

  calculateRow(row){
    if (row.date && row.start_time && row.end_time) {
      let start = moment({ year: row.date.year, month: row.date.month, day: row.date.day, hour: row.start_time.hour, minute: row.start_time.minute});
      let end = moment({ year: row.date.year, month: row.date.month, day: row.date.day, hour: row.end_time.hour, minute: row.end_time.minute});

      let diff: Number = end.diff(start,'hours',true);
      row.total_hours = diff;

      if (diff > 0) {
        if (diff % 1 == 0){
          row.hours = row.total_hours;
        }else{
          row.hours = diff.toFixed(2);
        }
        this.calculateTime();
      }
    }
  }

  calculateTime(){
    this.total_hours = 0;
    for (let row of this.rows) {
      if (row.total_hours) {
        this.total_hours += row.total_hours;
      }
    }
    this.total_hours = this.total_hours.toFixed(2);
  }

  addRow(): void {
    let row = { date: undefined,
      start_time: { hour: 12, minute: 0 },
      end_time: { hour: 12, minute: 0 },
      regular_hours: undefined,
      total_hours: undefined
    }

    this.rows.push(row);
  }

  deleteRow(i: number){
    this.rows.splice(i,1);
  }

}
