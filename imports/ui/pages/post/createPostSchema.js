import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    title: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    }
})

