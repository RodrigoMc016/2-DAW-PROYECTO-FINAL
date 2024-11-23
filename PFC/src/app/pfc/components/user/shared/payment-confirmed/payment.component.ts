import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'payment-success',
  templateUrl: 'payment.component.html',
  styleUrl: 'payment.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ]

})

export class paymentConfirmedComponent {
  paymentSuccess: boolean = true;//para dar dos mensajes dependiendo del estado del pago 
;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {


  }
}
