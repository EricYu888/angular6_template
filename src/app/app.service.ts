import { Injectable } from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

@Injectable()

export class AppService {
    Token = "";
    private globalLany: Subject<any> = new BehaviorSubject<any>(null);
    private lang = new Subject<any>();

    public registerLanguageChangeListener(onChanged: (data) => void): Subscription {
        return this.globalLany.subscribe({
            next: (u) => {
                if (u !== null) {
                    onChanged(u);
                }
            }
        })
    }

    public unRegisterLanguageChangeListener() {
        try {
            this.globalLany.unsubscribe();
        }
        catch{

        }
    }

    public publishLanguageChanged(data)
    {
        this.globalLany.next(data);
    }
}