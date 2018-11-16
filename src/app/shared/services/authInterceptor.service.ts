import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { viewEnd } from '@angular/core/src/render3/instructions';
import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone(
            {
                url: (req.url + "&token=skdjekske23sd342")
            }
        )
        return next.handle(authReq).pipe(mergeMap((event: any) => { //后台报错
            if (event instanceof HttpResponse && event.status !== 200) {
                return ErrorObservable.create(event);
            }
            return Observable.create(observer => observer.next(event)); //请求成功返回响应
        }),
            catchError((res: HttpResponse<any>) => {
                switch (res.status) {
                    case 401:
                    //DO

                    // break;
                    case 402:
                    //DO
                    // break;
                    case 403:
                    //DO
                    // break;
                    case 404:
                    //DO
                    // break;
                    default:
                        this.goLogin();
                }
                return ErrorObservable.create(event)
            })
        )
    }

    goLogin() {
        //need to do  ,remove  login session
        this.router.navigate(['/login']);
    }
}