import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class ShopService {
    constructor(public http: HttpService) { }

    public getDropDown():Promise<any>{
        return this.http.get('shop/getDropDown');
    }

    public getAll(params):Promise<any>{
        return this.http.get('shop/getAll', params);
    }

    public getShopById(params):Promise<any>{
        return this.http.get('shop/getById', params);
    }

    public addShop(params):Promise<any>{
        return this.http.post('shop/addShop', params);
    }

    public changeState(params):Promise<any>{
        return this.http.post('shop/changeState', params);
    }

    public updateShop(params):Promise<any>{
        return this.http.post('shop/updateShop', params);
    }

    public deleteById(params):Promise<any>{
        return this.http.post('shop/deleteById', params);
    }

    public batchDelete(params):Promise<any>{
        return this.http.post('shop/batchDelete', params);
    }
}