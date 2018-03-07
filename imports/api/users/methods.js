import {Meteor} from 'meteor/meteor';
import UsersService from '/imports/api/users/userService'

Meteor.methods({
    'user.register'(data) {
        UsersService.userRegister(data);
    },
    'user.remove' () {
        UsersService.userRemove(this.userId);
    }
});
