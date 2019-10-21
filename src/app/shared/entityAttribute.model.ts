export class EntityAttributeTypes {
    name: string;
    type: string;
    valueString: string;
    values: EntityAttributeValues[];

    constructor(name: string = '', type: string = '', valueString: string = '', values: EntityAttributeValues[] = []) {
        this.name = name;
        this.type = type;
        this.valueString = valueString;
        this.values = values;
    }
}

export class EntityAttributeValues {
    box: string;
    glyph: string;
    dashArray: string;
    name: string;

    constructor(name: string = '', box: string = 'none', glyph: string = 'glyph', dashArray: string = '1,2') {
        this.box = box;
        this.glyph = glyph;
        this.dashArray = dashArray;
        this.name = name;
    }

    static generateAttributeValues(name): EntityAttributeValues {
        return {
            box: 'none',
            glyph: 'glyph',
            dashArray: '1,2',
            name: name
        };
    }

}