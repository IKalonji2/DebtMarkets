import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'debt-markets';
  isLoggedIn = false;
  navItems: { label: string; link: string; action?: () => void }[] = [];
  userInfo: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.updateNavItems();
    });

    this.authService.role$.subscribe((role) => {
      this.userInfo = role;
      this.updateNavItems();
    });
  }

  updateNavItems(): void {
    if (this.isLoggedIn && this.userInfo) {
      if (this.userInfo === 'lender') {
        this.navItems = [
          { label: 'Dashboard', link: '/lender-dashboard' },
          { label: 'Auctions', link: '/auctions' },
          { label: 'Profile', link: '/profile' },
          { label: 'Logout', link: '', action: () => this.logout() }
        ];
      } else {
        this.navItems = [
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Auctions', link: '/auctions' },
          { label: 'Trading', link: '/trades' },
          { label: 'Logout', link: '', action: () => this.logout() }
        ];
      }
    } else {
      this.navItems = [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
        { label: 'Auctions', link: '/auctions' },
        { label: 'Trades', link: '/trades' }
      ];
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
