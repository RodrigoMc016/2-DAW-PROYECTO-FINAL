import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'cooking-point',
  templateUrl: 'cooking-point-component.html',
  styleUrl:'cooking-point-component.scss',
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

export class cookingPointComponent  {

  cookingForm: FormGroup;
  constructor(private fb:FormBuilder, private dialogRef:MatDialogRef<cookingPointComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.cookingForm = this.fb.group({
      cookingPoint: ['', Validators.required]
    });
   }

   // Método que se llama cuando el formulario se envía
  onSubmit(): void {
    if (this.cookingForm.valid) {
      const selectedValue = this.cookingForm.value.cookingPoint;
      console.log('Punto de cocción seleccionado:', selectedValue);
      // Aquí puedes agregar la lógica para hacer algo con el punto de cocción seleccionado
      this.dialogRef.close(selectedValue); // Cierra el modal y pasa el valor
    }
  }

  // Método para cancelar
  cancel(): void {
    this.dialogRef.close();
  }


}
