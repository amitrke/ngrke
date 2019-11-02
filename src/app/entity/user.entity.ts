import { BaseEntity } from './base.entity';
import { environment } from '../../environments/environment';
import { ContentEntity } from './content.entity';

export class UserSocial {

    constructor (
        public email: string,
        public id: string,
        public type: string,
        public profilePic: string
    ) {}
}
export class UserEntity extends BaseEntity {

    public files: {Key: string, ETag: string}[];
    public posts: ContentEntity[];

    constructor(
        public type: string,
        public social: UserSocial[],
        public webid: string,
        public name: string,
        public created: Date,
        public lastLogin: Date
    ) {
        super();
    }

    public static instanceFromGoogle = (googleUser: gapi.auth2.GoogleUser) => {
        const social = new UserSocial(
            googleUser.getBasicProfile().getEmail(), googleUser.getBasicProfile().getId(), 'gl',
            googleUser.getBasicProfile().getImageUrl()
        );
        const socialAry = [];
        socialAry.push(social);
        const user = new UserEntity(
            'pr-user', socialAry, environment.website, googleUser.getBasicProfile().getName(),
            new Date(), new Date()
        );
        return user;
    }

    public getImageUrl = () => {
        if (this.social && this.social.length > 0) {
            return this.social[0].profilePic;
        }
    }

    public getEmail = () => {
        if (this.social && this.social.length > 0) {
            return this.social[0].email;
        }
    }
}
