import { Component, OnInit } from '@angular/core';
import { TraderService } from '../../../services/trader.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  tokens: any[] = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
