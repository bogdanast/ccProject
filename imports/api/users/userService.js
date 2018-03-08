import {Accounts} from 'meteor/accounts-base';

class UsersService {
    register(data) {
        return Accounts.createUser({
            email: data.email,
            password: data.password
        })
    }

    remove(userId) {
        Meteor.users.remove(userId);
    }

}

export default new UsersService()