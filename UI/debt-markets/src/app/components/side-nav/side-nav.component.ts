import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() isOpen = false;
  @Input() menuItems: { label: string; link: string }[] = [];

  constructor(private router: Router) {}

  navigate(link: string) {
    this.router.navigate([link]);
  }
}
