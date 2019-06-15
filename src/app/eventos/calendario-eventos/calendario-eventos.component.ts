import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario-eventos',
  templateUrl: './calendario-eventos.component.html',
  styleUrls: ['./calendario-eventos.component.css']
})
export class CalendarioEventosComponent implements OnInit {

  model: NgbDateStruct;
  @Output() fecha = new EventEmitter();
  constructor(private calendar: NgbCalendar) {
  }
  ngOnInit() {
  }

  selectToday() {
    this.model = this.calendar.getToday();
    this.fecha.emit(this.model);
  }
}

