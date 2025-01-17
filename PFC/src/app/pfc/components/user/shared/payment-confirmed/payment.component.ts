import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/cart.service';


@Component({
  selector: 'payment-success',
  templateUrl: 'payment.component.html',
  styleUrl: 'payment.component.scss',
  standalone: true,
  imports: [
    RouterLink,

  ]

})

export class paymentConfirmedComponent {



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService
  ) { }

}
