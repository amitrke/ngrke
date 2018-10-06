import { BaseEntity } from './base.entity';


export class UserEntity extends BaseEntity {
    constructor(
        public gid: string,
        public name: string,
        public email: string,
        public imageURL: string,
        public indicator: string
    ) {
        super();
    }
}
