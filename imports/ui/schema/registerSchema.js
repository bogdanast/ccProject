import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String
    },
    password2:{
        type: String,
        custom() {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        },
    }
})