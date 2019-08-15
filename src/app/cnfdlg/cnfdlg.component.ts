import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../entity/dialogdata.entity';

@Component({
  selector: 'app-cnfdlg',
  templateUrl: './cnfdlg.component.html',
  styleUrls: ['./cnfdlg.component.scss']
})
export class CnfdlgComponent implements OnInit {

  yes = 'yes';
  no = 'no';

  constructor(
    public dialogRef: MatDialogRef<CnfdlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

}
