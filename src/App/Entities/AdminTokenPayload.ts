import {BaseTokenPayload} from "./BaseTokenPayload";

export class AdminTokenPayload implements BaseTokenPayload {
    public _id: string;
    public scope: string[];
    public email: string;

    constructor(id: string, scope: string[], email: string) {
        this._id = id;
        this.scope = scope;
        this.email = email;
    }

    toPlainObject(): object {
        return {
            _id: this._id,
            scope: this.scope,
            email: this.email
        }
    }
}