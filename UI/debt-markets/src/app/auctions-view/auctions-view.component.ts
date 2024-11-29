import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auctions-view',
  templateUrl: './auctions-view.component.html',
  styleUrl: './auctions-view.component.css'
})
export class AuctionsViewComponent implements OnInit{
  liveAuction = [
    {
      bundle: "Home Loans",
      description : "Housing finance....",
      entity_name: "AAA Bank",
      rating : "A",
      bundle_value : "R 5 000 000",
      bids: 2,
      highest_bid : "Highest Val"

    },
    {
      bundle: "Credit",
      description : "Credit cards....",
      entity_name: "ABC Bank",
      rating : "B",
      bundle_value : "Value of bundle",
      bids: 2,
      highest_bid : "Highest Val"

    },
    {
      bundle: "Vehicle Loans",
      description : "Vehicle finance....",
      entity_name: "C-more Bank",
      rating : "C",
      bundle_value : "Value of bundle",
      bids: 2,
      highest_bid : "Highest Val"
    },
    {
      bundle: "Personal Loans",
      description : "Personal finance....",
      entity_name: "Distant Bank",
      rating : "D",
      bundle_value : "Value of bundle",
      bids: 2,
      highest_bid : "Highest Val"
    }
  ]

  isExpanded = false;
  expandedCard: any = null;
  showAll = false;

  cards: any[] = [];

  ngOnInit(): void {
    this.updateVisibleCards();
  }

  toggleExpand() {
    this.showAll = !this.showAll;
    this.updateVisibleCards();
  }

  updateVisibleCards() {
    this.cards = this.showAll ? this.liveAuction : this.liveAuction.slice(0, 3);
  }

  expandCard(card: any) {
    this.expandedCard = this.expandedCard === card ? null : card;
  }

  isExpandedCard(card: any): boolean {
    return this.expandedCard === card;
  }

}

