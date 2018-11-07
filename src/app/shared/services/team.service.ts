import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class TeamService {
    constructor(public http: HttpService) { }

    public getDropDown(params):Promise<any>{
        return this.http.get('team/getDropDown', params);
    }

    public getByShop(params):Promise<any>{
        return this.http.get('team/getByShop', params);
    }

    public getAll(params):Promise<any>{
        return this.http.get('team/getAll', params);
    }

    public getTeamById(params):Promise<any>{
        return this.http.get('team/getById', params);
    }

    public addTeam(params):Promise<any>{
        return this.http.post('team/addTeam', params);
    }

    public changeState(params):Promise<any>{
        return this.http.post('team/changeState', params);
    }

    public updateTeam(params):Promise<any>{
        return this.http.post('team/updateTeam', params);
    }

    public deleteById(params):Promise<any>{
        return this.http.post('team/deleteById', params);
    }

    public batchDelete(params):Promise<any>{
        return this.http.post('team/batchDelete', params);
    }
}