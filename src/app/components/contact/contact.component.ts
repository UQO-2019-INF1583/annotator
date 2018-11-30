import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [ContactComponent]
})

export class ContactComponent implements OnInit {
    private message: string;

    constructor(private afs: AngularFirestore) {

    }

    ngOnInit() {
    }
    createMessage() {

        this.afs.collection('messageContact').doc(this.afs.createId()).set(this.message);
    }


}

