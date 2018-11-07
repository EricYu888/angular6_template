import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppHeaderService {
    // headerEventer: EventEmitter<any> = new EventEmitter();

    private Source=new Subject<any>();
    Status$=this.Source.asObservable();

    showMsgCount(count) {
        // this.headerEventer.emit(count);
        this.Source.next(count);
    }
}