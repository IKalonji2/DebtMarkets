import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface NavItem {
  label: string;
  link?: string;
  action?: () => void;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() logoLink: string = '/';
  @Input() logoText: string = 'DebtMarkets';

  @Input() menuItems: NavItem[] = [];
  isLoggedIn = false;
  role: string | null = null;
  @Input() userInfo: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.updateNavItems();
    });

    this.authService.role$.subscribe(role => {
      this.role = role;
      this.updateNavItems();
    });

    this.isLoggedIn = this.authService.isAuthenticated();
    this.role = this.authService.getRole();
    this.userInfo = this.isLoggedIn ? this.getUserInfo() : null;
    this.updateNavItems();
  }

  private updateNavItems(): void {
    if (this.isLoggedIn) {
      this.menuItems = this.getLoggedInNavItems(this.role);
    } else {
      this.menuItems = this.getLoggedOutNavItems();
    }
  }

  private getLoggedInNavItems(role: string | null): NavItem[] {
    const commonItems: NavItem[] = [
      { label: 'Logout', action: () => this.logout() }
    ];

    if (role === 'lender' || role === 'trader' || role === 'collector') {
      return [
        { label: 'Profile', link: '/profile' },
        ...commonItems
      ];
    }

    return [];
  }

  private getLoggedOutNavItems(): NavItem[] {
    return [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' },
      { label: 'Auctions', link: '/auctions' },
      { label: 'Trades', link: '/trades' }
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private getUserInfo(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token) as any;
      return decodedToken.username || decodedToken.email || null;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
}
