import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class UserService {
    constructor(public http: HttpService) { }

    public getAll(params):Promise<any>{
        return this.http.get('user/getAll', params);
    }

    public getUserById(params):Promise<any>{
        return this.http.get('user/getUserById', params);
    }

    public addUser(params):Promise<any>{
        return this.http.post('user/addUser', params);
    }

    public changeState(params):Promise<any>{
        return this.http.post('user/changeState', params);
    }

    public updateUser(params):Promise<any>{
        return this.http.post('user/updateUser', params);
    }

    public deleteById(params):Promise<any>{
        return this.http.post('user/deleteById', params);
    }

    public batchDelete(params):Promise<any>{
        return this.http.post('user/batchDelete', params);
    }

    public getCurrentUser():Promise<any>{
        return this.http.get('user/getCurrentUser');
    }

    public getDropDown(params):Promise<any>{
        return this.http.get('user/getDropDown', params);
    }
}