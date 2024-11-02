import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: 'contact-component.html',
  styleUrl: 'contact-component.scss',
  standalone: true,
  imports:[
    ReactiveFormsModule,
  ]
})

export class ContactComponent  {

  // formularioFeedback: FormGroup;
  // constructor(private datos2: FormBuilder, private feedbackService: FeedbackService) { }


}
