import {Accounts} from 'meteor/accounts-base';

class UsersService{
    userRegister(data){
        return Accounts.createUser({
            email: data.email,
            password: data.password
        })
    }

    userRemove(userId){
        Meteor.users.remove(userId);
    }

}
export default new UsersService()