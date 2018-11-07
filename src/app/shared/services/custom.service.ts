import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class CustomService {
    constructor(public http: HttpService) { }

    public addCustom(params):Promise<any>{
        return this.http.post('custom/addCustom', params);
    }

    public batchDelete(params):Promise<any>{
        return this.http.post('custom/batchDelete', params);
    }

    public changeState(params):Promise<any>{
        return this.http.post('custom/changeState', params);
    }

    public deleteById(params):Promise<any>{
        return this.http.post('custom/deleteById', params);
    }

    public getAll(params):Promise<any>{
        return this.http.get('custom/getAll', params);
    }

    public getById(params):Promise<any>{
        return this.http.get('custom/getById', params);
    }

    public updateCustom(params):Promise<any>{
        return this.http.post('custom/updateCustom', params);
    }

    public getCustom(params):Promise<any>{
        return this.http.get('custom/getCustom', params);
    }
}