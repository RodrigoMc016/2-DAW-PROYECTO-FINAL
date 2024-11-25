import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrl: 'confirmation-dialog.component.scss',
  standalone: true,
  imports: []

})

export class confirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<confirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    close(): void {
      this.dialogRef.close();
    }

}
