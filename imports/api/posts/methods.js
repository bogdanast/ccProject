import {Meteor} from 'meteor/meteor';
import Posts from '/imports/db/posts/collection'
import PostService from '/imports/api/posts/posts.service'

Meteor.methods({
    'post.create'(post) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        PostService.postCreate(post);
    },
    'post.get'(_id) {
       return PostService.postGet(_id);
    },
    'post.edit'(_id, editedData) {
        PostService.postEdit(_id, editedData)
    },
    'post.remove'(_id) {
        const posts = Posts.findOne({_id: _id});
        if (posts.userId !== this.userId) {
            throw new Meteor.Error('you are not the owner and cant delete that post');
        }
        PostService.postRemove(_id);
    }
});