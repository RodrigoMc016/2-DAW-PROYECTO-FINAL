import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NgIf, NgStyle } from '@angular/common';
import { CartService } from '../../../../../services/cart.service';

@Component({
  selector: 'add-sauce',
  templateUrl: 'add-sauce.component.html',
  styleUrl:'add-sauce.component.scss',
  standalone:true,
  imports:[

    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatRadioModule,
    NgIf,
    NgStyle


  ]
})

export class addSauceComponent  {

  sauceForm: FormGroup;
  constructor(private cartService:CartService,private fb:FormBuilder, private dialogRef:MatDialogRef<addSauceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.sauceForm= this.fb.group({
      addSauce: ['', Validators.required]
    });
   }

   //Al enviar el formulario:
  onSubmit(): void {
    const selectedProduct = this.data.product;
    if (this.sauceForm.valid) {
      const selectedValue = this.sauceForm.value.addSauce;
      this.dialogRef.close(selectedValue);  // Cierra el modal y pasa el valor

      const productId = this.data.productId;
      this.cartService.addItem(selectedProduct);
      this.cartService.updateSauce(productId, selectedValue);  // Actualiza la salsa en el carrito
    }
  }

  // Método para cancelar
  cancel(): void {
    this.dialogRef.close();
  }


}
