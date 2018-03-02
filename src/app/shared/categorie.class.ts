import {ICategorie} from './categorie.model';
export class Categorie implements ICategorie {
    id: string;
    color: string;
    name: string;
    projectId: string;

    constructor(id: string, color: string, name: string, projectId: string) {
        this.id = id;
        this.color = color;
        this.name = name;
        this.projectId = projectId;
    }

}
