import { Component, OnInit, Input, DoCheck } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit, DoCheck {

  now = moment();
  maxDate = { day: this.now.toObject().date, month: this.now.toObject().months, year: this.now.toObject().years };

  time_placeholders = ['12:34 A', '5:05 a', '10:15 am', '11:43 AM', '3:45 p', '7:23 P', '10:05 pm', '8:25 PM'];

  rows: any = [
    { date: undefined,
      start_time: undefined,
      end_time: undefined,
      regular_hours: undefined,
      total_hours: undefined,
      hours: '',
      valid_date: true,
      valid_start: true,
      valid_end: true,
      start_placeholder: this.timePlaceholder(),
      end_placeholder: this.timePlaceholder()
    }
  ];

  total_hours: any = 0;


  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(){
    for (let row of this.rows) {
      if (row.date) {
        this.checkDate(row);
      }
      if ( row.start_time || row.end_time ){
        this.calculateRow(row);
      }
    }
  }

  checkDate(row){
    let regex = /([0-9])\w+/g;

    let d = row.date.match(/\d+/g);

    if (d.length >= 2) {
      row.valid_date = moment(row.date,'MM-DD-YYYY').isValid();
    }else{
      row.valid_date = true;
    }
  }

  calculateRow(row){
    if (!row.date) {
      let start = moment('1-1-19 ' + row.start_time, 'MM-DD-YYYY LT');
      let end = moment('1-1-19 ' + row.end_time, 'MM-DD-YYYY LT');

      row.valid_start = moment(start,'MM-DD-YYYY LT').isValid();
      row.valid_end = moment(end,'MM-DD-YYYY LT').isValid();
    } else {
      let start = moment(row.date + ' ' + row.start_time, 'MM-DD-YYYY LT');
      let end = moment(row.date + ' ' + row.end_time, 'MM-DD-YYYY LT');

      row.valid_start = moment(start,'MM-DD-YYYY LT').isValid();
      row.valid_end = moment(end,'MM-DD-YYYY LT').isValid();

      let diff: Number = end.diff(start,'hours',true);
      row.total_hours = diff;

      if (diff > 0) {
        if (diff as any % 1 == 0){
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

  timePlaceholder(){
     return this.time_placeholders[Math.floor(Math.random() * this.time_placeholders.length)];
  }

  addRow(): void {
    let row = { date: undefined,
      start_time: undefined,
      end_time: undefined,
      regular_hours: undefined,
      total_hours: undefined,
      hours: '',
      valid_date: true,
      valid_start: true,
      valid_end: true,
      start_placeholder: this.timePlaceholder(),
      end_placeholder: this.timePlaceholder()
    }

    if (this.rows[this.rows.length - 1].date) {
      row.date = this.rows[this.rows.length - 1].date;
    }

    this.rows.push(row);
  }

  deleteRow(i: number){
    this.rows.splice(i,1);
  }

}
