export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public imageURL: string,
        public indicator: string
    ) {}
}
