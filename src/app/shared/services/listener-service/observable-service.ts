import { Injectable } from '@angular/core';
import {Subject, Observable } from 'rxjs';


@Injectable()

export class CommonCommunicationService{


    private Source=new Subject<any>();
    Status$=this.Source.asObservable();
    constructor(){

    }

    listening():Observable<any>{
        console.log('listening')
        return this.Source.asObservable();
    }

    publishData(data){
        console.log('publishData')
        console.log(data);
        this.Source.next(data)
    }

}