import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class LogoutService {
    constructor(public http: HttpService) { }

    public logout():Promise<any>{
        return this.http.get('user/logout');
    }
}