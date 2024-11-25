import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent {
  nameOfCards = ['Lender', 'Collection', 'Trader'];
  images = ['../../assets/images/lender.png'];

  constructor(private router: Router) {}

  setTitle(cardName: string) {
    localStorage.setItem('formTitle', cardName);
  }
}
