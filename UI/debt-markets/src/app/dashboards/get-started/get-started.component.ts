import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent {
  cardComponents = [
    {title :'Lender', pic: '../../assets/images/lender.svg'},
    {title :'Collector', pic: '../../assets/images/collector.svg'},
    {title: 'Trader',pic : '../../assets/images/trader.svg'}
  ]
  private formTitleSubject = new BehaviorSubject<string>('Default Title');
  formTitle$ = this.formTitleSubject.asObservable();

  constructor(private router: Router) {}

  setTitle(cardName: string) {
    this.formTitleSubject.next(cardName);
    localStorage.setItem('formTitle', cardName);
  }

  ngOnInit(): void {
    const storedTitle = localStorage.getItem('formTitle') || 'Default Title';
    this.formTitleSubject.next(storedTitle);
  }
}
