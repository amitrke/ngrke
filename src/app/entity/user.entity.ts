export class UserEntity {
    constructor(
        public id: Number,
        public gid: string,
        public name: string,
        public email: string,
        public imageURL: string,
        public indicator: string
    ) {}
}
