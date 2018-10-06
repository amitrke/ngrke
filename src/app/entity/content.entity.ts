import { BaseEntity } from './base.entity';

export class ContentEntity extends BaseEntity {
    constructor (
        public title: string,
        public imageURL: string,
        public description: string,
        public fullText: string,
        public priority: number) {
            super();
        }
}
