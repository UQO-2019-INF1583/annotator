import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Project } from '../../shared/project.model';

// secret: structure de données utilisée pour représenter l'ensemble des projets
// et en particulier, association entre projetId et l'emplacement du fichier correspondant

@Injectable()
export class ProjectManagerService {

  constructor(private afs: AngularFirestore) { }

  deleteProject(projectId: string) {
    this.afs.collection('Corpus').ref.where('projectId', '==', projectId).get().then(querySnapshot => {
      const batch = this.afs.firestore.batch();

      querySnapshot.forEach(doc => {

        batch.delete(doc.ref);
        firebase.storage().ref().child('Projects/' + doc.data().id + '/' + doc.data().title).delete();

      });
      return batch.commit();
    }).then(() => {
      console.log('Corpus supprimé');
    });

    this.afs.collection('Projects').doc(projectId).delete();
  }

  // Modifie le titre du projet.
  modifyTitle(projectId: string, title: string): boolean {
    this.afs.collection('Projects').doc(projectId).update({ 'title': title }).then(() => {
      console.log('title updated');
    },
      (() => false));
    return true;
  }

  // Ajoute un administrateur du projet.
  // Retourne false si adminId est déjà administrateur.
  addAdmin(projectId: string, adminId: string): boolean {
    const projectRef = this.afs.collection('Projects').doc(projectId);
    projectRef.ref.get().then((doc) => {
      const admin = doc.get('admin');
      if (admin.indexOf(adminId) === -1) {
        admin.push(adminId);
        projectRef.update({ 'admin': admin }).then(() => {
          console.log('admin[] updated');
          return true;
        })
      }
    }).catch(function (error) {
      console.log('Error getting project:', error);
    });
    return false;
  }

  // Supprime un administrateur du projet.
  // Retourne false si adminId n'est pas administrateur.
  delAdmin(projectId: string, adminId: string): boolean {
    const projectRef = this.afs.collection('Projects').doc(projectId);
    projectRef.ref.get().then((doc) => {
      const admin = doc.get('admin');
      if (admin.indexOf(adminId) === -1) {
        return false;
      }
      for (let i = admin.length - 1; i >= 0; i--) {
        if (admin[i] === adminId) {
          admin.splice(i, 1);
        }
      }
      projectRef.update({ 'admin': admin }).then(() => {
        console.log('admin[] updated');
      },
        (() => false));
    }).catch(function (error) {
      console.log('Error getting project:', error);
    });
    return true;
  }

  // Ajoute un annotateur à un projet
  // Retourne false si projectId ou userId n'existe pas.
  addAnnotator(projectId: string, userId: string): boolean {
    const projectRef = this.afs.collection('Projects').doc(projectId);
    projectRef.ref.get().then((doc) => {
      const annotators = doc.get('annotators');
      if (annotators.indexOf(userId) === -1) {
        annotators.push(userId);
        projectRef.update({ 'annotators': annotators }).then(() => {
          console.log('annotators[] updated');
          return true;
        })
      }
    }).catch(function (error) {
      console.log('Error getting project:', error);
    });
    return false;
  }

  // Supprime un annotateur du projet.
  // Retourne false si userId n'est pas annotateur.
  delAnnotator(projectId: string, userId: string): boolean {
    const projectRef = this.afs.collection('Projects').doc(projectId);
    projectRef.ref.get().then((doc) => {
      const annotators = doc.get('annotators');
      if (annotators.indexOf(userId) === -1) {
        return false;
      }
      for (let i = annotators.length - 1; i >= 0; i--) {
        if (annotators[i] === userId) {
          annotators.splice(i, 1);
        }
      }
      projectRef.update({ 'annotators': annotators }).then(() => {
        console.log('annotators[] updated');
      },
        (() => false));
    }).catch(function (error) {
      console.log('Error getting project:', error);
    });
    return true;
  }

  getProject(projectId: string): Promise<any> {
    return this.afs.collection('Projects/').doc(projectId).ref.get();
  }


  // Produit une liste des ids de tous les projets.
  getAll(projectId: string): Observable<Project>[] {
    const projetCollection = this.afs.collection<Project>('Projects');
    let all;
    projetCollection.valueChanges().subscribe((projs) => { all = projs; });
    return all;
  }

  // Produit une liste des ids de tous les annotateurs d'un projet.
  // Retourne false si projectId n'existe pas.
  getAnnotators(projetId: string): string[] | boolean {
    return false;
  }

  // Produit une liste des ids de tous les projets avec username comme annotateur.
  // Retourne false si username n'existe pas.
  getProjectsAnnotated(username: string): string[] | boolean {
    return false;
  }

  // Produit une liste des ids de tous les projets avec username comme administrateur.
  // Retourne false si username n'existe pas.
  getProjectsAdministrated(username: string): string[] | boolean {
    return false;
  }

  getAnnotator() {
    return null;
  }

  /*
    // Produit une liste des noms de tous les documents d'un projet.
    // Retourne false si projectId n'existe pas.
    getCorpus(projetId: string): string[] | boolean {
      return false;
    }
  */
  getCorpus() {
    return this.afs
      .collection('Corpus', ref => ref
        .where('titreProjet', '==', this.current().titreProjet))
      .valueChanges();
  }

  getCategories() {
    return this.afs
      .collection('Categories', ref => ref
        .where('titreProjet', '==', this.current().titreProjet))
      .valueChanges();
  }

  // récupérer le titre du token du projet courant
  current() {
    return JSON.parse(localStorage.getItem('currentProjet'));
  }

  // Ajoute un nouveau document à un projet à partir d'un fichier texte.
  // Retourne false si projectId n'existe pas ou documentPath n'est pas correct.
  addDocument(projectId: string, documentPath: string): boolean {
    return false;
  }

  // Retourne le document avec documentName
  // Retourne false si documentName n'existe pas .
  getDocument(documentName: string): Document | boolean {
    return false;
  }

  // Supprime un document d'un projet
  // Retourne false si projectId ou documentName n'existe pas .
  delDocument(projectId: string, documentName: string): boolean {
    return false;
  }

  // recuperer le nom du courant utilisateur
  isAdmin(user: string) {
    if (user === this.current().admin) {
      return true;
    } else {
      return false;
    }
  }

  /*
    //recuperer le nom du courant utilisateur
    his(){
      return JSON.parse(this.currentProject).admin;
    }

    updateId(){
      this.content=JSON.parse(localStorage.getItem('PkId'));
      if (this.content){
        this.afs.doc(`${this.content.database}/${this.content.id}`).update(this.content);
      }
    }
  */
}
