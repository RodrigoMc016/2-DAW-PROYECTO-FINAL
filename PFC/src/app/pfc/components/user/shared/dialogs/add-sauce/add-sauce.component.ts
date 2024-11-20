import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NgIf, NgStyle } from '@angular/common';

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
  constructor(private fb:FormBuilder, private dialogRef:MatDialogRef<addSauceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.sauceForm= this.fb.group({
      addSauce: ['', Validators.required]
    });
   }

   //Al enviar el formulario:
  onSubmit(): void {
    if (this.sauceForm.valid) {
      const selectedValue = this.sauceForm.value.addSauce;
      console.log('Punto de cocción seleccionado:', selectedValue);

      this.dialogRef.close(selectedValue); // Cierra el modal y pasa el valor
    }
  }

  // Método para cancelar
  cancel(): void {
    this.dialogRef.close();
  }


}
