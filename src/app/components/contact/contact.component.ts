import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [ContactComponent]
})

export class ContactComponent implements OnInit {
    constructor(public router: Router) { }

    ngOnInit() {
    }

}