import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class ProductService {
    constructor(public http: HttpService) { }

    public addProduct(params):Promise<any>{
        return this.http.post('product/addProduct', params);
    }

    public batchDelete(params):Promise<any>{
        return this.http.post('product/batchDelete', params);
    }

    public changeState(params):Promise<any>{
        return this.http.post('product/changeState', params);
    }

    public deleteById(params):Promise<any>{
        return this.http.post('product/deleteById', params);
    }

    public getAll(params):Promise<any>{
        return this.http.get('product/getAll', params);
    }

    public getById(params):Promise<any>{
        return this.http.get('product/getById', params);
    }

    public updateProduct(params):Promise<any>{
        return this.http.post('product/updateProduct', params);
    }
}