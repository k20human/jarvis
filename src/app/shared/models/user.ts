export class User {
    id?: number;
    slug?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    groups?: Array<any>;
    roles?: Array<any>;
    enabled?: boolean;
    plain_password?: {first: string, second: string};
    first_password?: string;
    second_password?: string;

    static fromJSON(userJSON: any): User {
        const user = new User();

        user.id = (userJSON.id) ? userJSON.id : null;
        user.username = (userJSON.username) ? userJSON.username : null;
        user.firstname = (userJSON.firstname) ? userJSON.firstname : null;
        user.lastname = (userJSON.lastname) ? userJSON.lastname : null;
        user.roles = (userJSON.roles) ? userJSON.roles : [];
        user.groups = (userJSON.groups) ? userJSON.groups : [];
        user.email = (userJSON.email) ? userJSON.email : null;
        user.enabled = (userJSON.enabled) ? userJSON.enabled : false;

        return user;
    }

    static toJSON(user): any {
        return user;
    }

    static setPassword(user: User) {
        if (user.first_password) {
            user.plain_password = {
                first: user.first_password,
                second: user.second_password,
            };
        }

        delete user.first_password;
        delete user.second_password;
    }

    public getName(): string {
        return this.firstname + ' ' + this.lastname;
    }
}
