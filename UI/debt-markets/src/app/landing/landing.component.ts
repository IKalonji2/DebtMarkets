import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  slideshowItems = [
    {
      image: './assets/images/online-auction.svg',
      title: 'Online Auction',
      description: [
        'Auction',
        'open',
        'to',
        'entities',
        'or',
        'indivuals',
        'who',
        'are',
        'at',
        'capacity',
        'to',
        'make',
        'a',
        'bid.',
      ],
    },
    {
      image: './assets/images/collection-agents.svg',
      title: 'Bidder',
      description: [
        'Bidding ',
        'is ',
        'open ',
        'for ',
        'collection ',
        'agents, ',
        'which ',
        'can ',
        'be ',
        'an ',
        'entity ',
        'or ',
        'individual. ',
        'Provided ',
        'that ',
        'they ',
        'are ',
        'registered ',
        'as ',
        'collection ',
        'agents ',
        'or ',
        'bidders. ',
      ],
    },
    {
      image: './assets/images/savings.svg',
      title: 'Sophisticated User',
      description: [
        'Individual',
        'who',
        'decides',
        'to',
        'invest',
        'when',
        'collection',
        'entity',
        'allows',
        'users',
        'to',
        'buy',
        'in,',
        'so',
        'they',
        'can',
        'potentially',
        'gain.'
      ],
    },
  ];

  activeIndex = 0;
  intervalId: any;

  constructor() {
    this.startAutoplay();
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoplay() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.activeIndex =
      (this.activeIndex + 1) % this.slideshowItems.length;
  }

  previousSlide() {
    this.activeIndex =
      (this.activeIndex - 1 + this.slideshowItems.length) %
      this.slideshowItems.length;
  }

  goToSlide(index: number) {
    this.activeIndex = index;
  }

}
