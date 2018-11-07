import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: '404.component.html'
})
export class _404Component implements OnInit {

    constructor(public router: Router) { }
   
    ngOnInit() {
    }
}
