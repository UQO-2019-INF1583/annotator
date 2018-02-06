import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {
  project = {'title':'', 'description':''};

  constructor(public router: Router){  }

  ngOnInit() {

  }

  create(){
    this.router.navigate(['project']);
  }

}
