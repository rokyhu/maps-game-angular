import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-warn',
  templateUrl: './dialog-warn.component.html',
  styleUrls: ['./dialog-warn.component.scss'],
})
export class DialogWarnComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; body: string }
  ) {}

  ngOnInit(): void {}
}
