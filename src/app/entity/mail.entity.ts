export class MailEntity {
    constructor(
        public toEmail: string,
        public toName: string,
        public subject: string,
        public textBody: string,
        public htmlBody: string
    ) {}
}
