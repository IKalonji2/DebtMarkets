import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() isOpen = false;
  @Input() menuItems: string[] = [];

  // Sections using side nav
  onTradingPage = false;

  toggleNav() {
    this.isOpen = !this.isOpen;
  }
}
