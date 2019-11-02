import { BaseEntity } from './base.entity';

export class ContentEntity extends BaseEntity {

    public images: string[];

    constructor (
        public title: string,
        public description: string,
        public fulltext: string,
        public priority: number) {
            super();
        }
}
