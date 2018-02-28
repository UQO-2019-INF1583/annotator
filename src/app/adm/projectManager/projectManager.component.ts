import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ProjectManagerService } from './projectManager.service';

@Component({
  selector: 'app-adm-projectManager',
  templateUrl: './projectManager.component.html',
  styleUrls: ['./projectManager.component.scss']
})


export class ProjectManagerComponent implements OnInit {
  displayedColumns = ['title', 'description', 'modify'];
  datasource: ProjectDataSource | null;

  constructor(public router: Router, private pms: ProjectManagerService) {
  }

  ngOnInit() {
    // initialize la datasource pour la mat-table
    this.datasource = new ProjectDataSource(this.pms);

  }

  modifyProject(project: any) {
    this.router.navigate(['/project', project]);
  }

  deleteProject(project: any) {
      // ajouter un pop up qui demande si l'utilisateur veut vraiment supprimer le projet
     this.pms.deleteProject(project.id);
  }

}

export class ProjectDataSource extends DataSource<any> {

  constructor(private pms: ProjectManagerService) {
    super();
  }

  connect(): Observable<any[]> {
    return this.pms.getCurrentUserProject();
  }

  disconnect(): void {

  }

}
