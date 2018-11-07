import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class LoginService {
    constructor(public http: HttpService) { }

    public login(params):Promise<any>{
        return this.http.post('user/login', params);
    }
}