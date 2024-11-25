import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'adminDialog',
  templateUrl: 'adminDialog.component.html',
  styleUrl:'adminDialog.component.scss',
  standalone:true,
  imports:[]
})

export class adminDialogComponent  {
  constructor(public dialogRef: MatDialogRef<adminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    close(): void {
      this.dialogRef.close();
    }

}
