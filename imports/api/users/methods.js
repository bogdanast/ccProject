import {Meteor} from 'meteor/meteor';
import UsersService from '/imports/api/users/userService'

Meteor.methods({
    'user.register'(data) {
        UsersService.register(data);
    },
    'user.remove'() {
        UsersService.remove(this.userId);
    }
});
