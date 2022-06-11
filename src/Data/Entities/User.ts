export class User {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {
    }
}