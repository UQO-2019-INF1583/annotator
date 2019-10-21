export class ProjectState {
    constructor(
        public value: number,
        public name: string
    ) { };
}

export enum StateEnum {
    NEW_PROJECT = 0,
    IN_PROGRESS = 1,
    REVIEW = 2,
    FINISH = 3
}

/*
If a new state is added in the enum make sure to add it in the states array in
project.component
*/