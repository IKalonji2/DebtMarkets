import { Injectable, ComponentRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open(component: any): ComponentRef<any> {
    const modalRef = this.modalService.open(component);
    return modalRef.componentInstance;
  }

  close(): void {
    this.modalService.dismissAll();
  }
}
