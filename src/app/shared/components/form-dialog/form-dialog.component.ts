import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {

  optionsForm: FormGroup;
  minStartDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
  }

  async ngOnInit() {
    this.minStartDate = this.data.date;
    this.optionsForm = this.fb.group({
      start_date: new FormControl(null, Validators.compose([Validators.required])),
      description: new FormControl(null, Validators.compose([Validators.required]))
    });
  }

  onNoClick(value): void {
    this.dialogRef.close(value);
  }

  submitForCheck() {
    this.onNoClick(this.optionsForm.value);
  }
}
