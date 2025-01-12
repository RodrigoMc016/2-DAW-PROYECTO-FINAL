import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/cart.service';


@Component({
  selector: 'payment-error',
  templateUrl: 'payment-cancelled.html',
  styleUrl: 'payment-cancelled.scss',
  standalone: true,
  imports: [
    RouterLink,

  ]

})

export class paymentCancelledComponent {

;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService
  ) { }

}
