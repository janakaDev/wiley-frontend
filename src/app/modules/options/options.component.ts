import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  optionsForm: FormGroup;
  minStartDate: any;

  constructor() { }

  ngOnInit(): void {
  }

  submitForCheck() {

  }
}
