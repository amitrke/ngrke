import { BaseEntity } from './base.entity';

export class PhotogalleryEntity extends BaseEntity {
    constructor (
        public imageURL: string
    ) {
        super();
    }
}
