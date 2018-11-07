import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppLoadingService {
    // loadingEventer: EventEmitter<any> = new EventEmitter();

    private Source=new Subject<any>();
    Status$=this.Source.asObservable();

    showLoading() {
        // this.loadingEventer.emit({type:"show"});
        this.Source.next({type:"show"});
    }

    hideLoading(){
        // this.loadingEventer.emit({type:"hide"});
        this.Source.next({type:"hide"});
    }
}