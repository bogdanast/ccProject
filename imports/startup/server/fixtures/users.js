import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import faker from 'faker';
import adminConfig from '/imports/api/adminConfig'
import configUsers from '/imports/startup/server/fixtures/configUsers'

const createUser = (email, password, roles) => {
    const userId = Accounts.createUser({email, password});
    // let updateData = {
    //     profile: {
    //         firstName: faker.name.firstName(),
    //         lastName: faker.name.lastName(),
    //     },
    // };
    if (roles) {
        Roles.addUsersToRoles(userId, roles);
    }
    // Meteor.users.update({_id: userId}, {
    //     $set: updateData
    // });
    return userId;
};
if (Meteor.users.find({}).fetch().length === 0) {
    createUser(adminConfig.EMAIL, adminConfig.PASSWORD, 'ADMIN');
    for (let i = 0; i < configUsers.USERS; i++)
        createUser(`user-${i + 1}@app.com`, '12345', 'USER');
    console.log('[Fixtures] Users have been loaded');
}