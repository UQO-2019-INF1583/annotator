export class Arc {
    arrowHead: string;
    color: string;
    labels: string[];
    dashArray: string;
    hotkey: string;
    type: string;
    targets: string[];

    constructor() {
        this.arrowHead = '';
        this.color = '';
        this.labels = [];
        this.dashArray = '';
        this.hotkey = '';
        this.type = '';
        this.targets = [];
    }
}
