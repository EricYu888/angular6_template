import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { DOMAIN}  from './../../shared/constants';
declare var require: any;
// const DOMAIN = require('../config.json').DOMAIN;
const headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Cache-control", "no-cache")
    .set("Pragma", "no-cache")
    .set("Expires", "0");

@Injectable()

export class HttpService {
    constructor(private http: HttpClient) {

    }

    public get(url, paraJson?, timeOut = 10 * 1000): Promise<any> {
        return new Promise((resolve, reject) => {
            let perferences = { headers };
            if (paraJson) {
                let params = new HttpParams();
                for (const item in paraJson) {
                    params = params.set(item, paraJson[item])
                }
                perferences['params'] = params;
            }
            // this.http.get(`${DOMAIN}${url}`,perferences).timeout

            this.http.get(`${DOMAIN}${url}`, perferences).subscribe(data => {
                // Read the result field from the JSON response.
                resolve(data)
            }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                    reject(err.error);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    reject(null);
                }
            });
        })
    }
    public post(url, body): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${DOMAIN}${url}`, body, { headers }).subscribe(data => {
                resolve(data);

            }), (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                    reject(err.error)
                }
                else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    reject(null)
                }
            }
        })
    }
    public put(url, body): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(`${DOMAIN}${url}`, body, { headers }).subscribe(data => {
                // Read the result field from the JSON response.
                resolve(data)
            }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                    reject(err.error);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            });
        })
    }
    public uploadFile(url, file, doprocess?: (process: number, response: any) => void) {
        const req = new HttpRequest('POST', `${DOMAIN}${url}`, file, {
            reportProgress: true,
        });
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% uploaded.`);
                doprocess(percentDone, null)
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
                doprocess(100, event.body)
            }
        });
    }
    public delete(url, paramJson?): Promise<any> {
        return new Promise((resolve, reject) => {
            let perferences = { headers };
            if (paramJson) {
                let params = new HttpParams();
                for (const item in paramJson) {
                    params = params.set(item, paramJson[item]);
                }
                // console.log(params);
                perferences['params'] = params;
            }
            this.http.delete(`${DOMAIN}${url}`, perferences).subscribe(data => {
                // Read the result field from the JSON response.
                resolve(data)
            }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                    reject(err.error);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            });
        })
    }

}