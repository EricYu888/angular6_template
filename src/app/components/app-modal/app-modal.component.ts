import { Component, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AppModalService } from './app-modal-service';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html'
})
export class AppModalComponent {

  @ViewChild('confirmModal') confirmModal: TemplateRef<any>;
  public modalRef: BsModalRef;

  modalContent: string;
  okcallback: any;
  cancelcallback: any;
  type: any;
  subscription: Subscription;

  constructor(private modalService: BsModalService, private appModalService: AppModalService, private changeDetection: ChangeDetectorRef) {
    // appModalService.modalEventer.subscribe(message => {
    //   console.log('showModal');
    //   this.showModal(message.type, message.modalContent, message.okcallback, message.cancelcallback);
    // });
    this.subscription = appModalService.Status$.subscribe(message => {
      this.type = message.type;
      this.showModal(message.type, message.modalContent, message.okcallback, message.cancelcallback);
    });
  }

  ngOnDestroy() {
    // this.appModalService.modalEventer.unsubscribe();
    this.subscription.unsubscribe();
  }

  showModal(type: string, modalContent: string, okcallback: any, cancelcallback?: any, dismisscallback?: any) {
    this.modalContent = modalContent;
    this.okcallback = okcallback;
    this.cancelcallback = cancelcallback;
    if ('confirm' == type) {
      this.modalRef = this.modalService.show(this.confirmModal, { backdrop: 'static', keyboard: false });
    }
    // else
    // {
    //   this.modalRef=this.modalService.show(this.confirmModal)
    // }
  }

  clickOk() {
    this.modalContent = null;
    this.cancelcallback = null;
    this.modalRef.hide();
    this.okcallback();
  }

  clickCancel() {
    this.modalContent = null;
    this.okcallback = null;
    this.modalRef.hide();
    if (this.cancelcallback) {
      this.cancelcallback();
    }
  }
}
