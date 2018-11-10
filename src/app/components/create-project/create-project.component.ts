import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectUtils } from '../../shared/project.model';
import { CreateProjectService } from './create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [CreateProjectService]
})

export class CreateProjectComponent implements OnInit {
  project: Project = ProjectUtils.generateEmpty();

  constructor(public router: Router, private cps: CreateProjectService) { }

  ngOnInit() { }

  create() {
    if (this.project.title != null && this.project.title !== '' &&
      this.project.description != null && this.project.description !== '') {

      this.cps.createNewProject(this.project);

      alert('Création d\'un nouveau projet réussi');
      this.router.navigate(['/']);
    }
  }
}
