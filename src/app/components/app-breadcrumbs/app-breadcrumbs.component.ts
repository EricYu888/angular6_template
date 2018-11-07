import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item"
        *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last"
        [ngClass]="{active: last}">
      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
    </li>
  </ng-template>`
})
export class AppBreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.route.root, url = '', label = '';
      this.initBreadcrumbs(currentRoute, url);
    });
  }

  private initBreadcrumbs(currentRoute: any, url) {
    const childrenRoutes = currentRoute.children
    if (childrenRoutes && childrenRoutes.length > 0) {
      let flag = false;
      url += '/' + currentRoute.snapshot.url.map(segment => segment.path).join('/');
      childrenRoutes.forEach(
        route => {
          if (this.initBreadcrumbs(route, url)) {
            flag = true;
          }
        }
      );
      let label = currentRoute.snapshot.data;
      if (flag) {
        this.breadcrumbs.unshift({
          label: label,
          url: url
        });
        return true;
      } else if (label.title != '') {
        this.breadcrumbs.unshift({
          label: label,
          url: url
        });
        return true;
      } else {
        return false;
      }
    } else {
      let label = currentRoute.snapshot.data;
      url += '/' + currentRoute.snapshot.url.map(segment => segment.path).join('/');
      if (label && label.title != '') {
        this.breadcrumbs.unshift({
          label: label,
          url: url
        });
        return true;
      } else {
        return false;
      }
    }
  }
}
