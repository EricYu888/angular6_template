import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppModalService {
    // modalEventer: EventEmitter<any>;

    // constructor(){
    //     this.modalEventer = new EventEmitter();
    // }

    private Source=new Subject<any>();
    Status$=this.Source.asObservable();

    showModal(message: { type: "confirm"; modalContent: string; okcallback: any; cancelcallback?: any}) {
        // this.modalEventer.emit(message);
        this.Source.next(message);
    }
}