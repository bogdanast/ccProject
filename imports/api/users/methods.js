import {Meteor} from 'meteor/meteor';
import Posts from '/imports/api/posts/collection'

console.log("AFUERA");

Meteor.methods({
    'user.register'(data) {
        return Accounts.createUser({
            email: data.email,
            password: data.password
        })
    },
    'user.remove' () {
        Meteor.users.remove(this.userId);
    }
});
