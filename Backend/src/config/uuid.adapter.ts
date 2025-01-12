import { v4 as uuidv4 } from 'uuid';

export class Uuid {
    static v4(): string {
        return uuidv4();
    }

    static generate(): string {
        return this.v4();
    }
}
