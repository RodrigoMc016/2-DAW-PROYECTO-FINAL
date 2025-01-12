import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NgIf, NgStyle } from '@angular/common';
import { CartService } from '../../../../../services/cart.service';

@Component({
  selector: 'normal-dialog',
  templateUrl: 'normal-dialog.component.html',
  styleUrl:'normal-dialog.component.scss',
  standalone:true,
  imports:[


    MatButton,
    NgIf,
    NgStyle


  ]
})

export class normalDialogComponent  {

  constructor( private cartService:CartService, private dialogRef:MatDialogRef<normalDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {


   }

   send():void{


    const selectedProduct = this.data.product;

    this.cartService.addItem(selectedProduct); // Añadir al carrito
    this.dialogRef.close(selectedProduct);
   }




  // Método para cancelar
  cancel(): void {
    this.dialogRef.close();
  }


}
