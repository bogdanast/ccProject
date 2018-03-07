import {Meteor} from "meteor/meteor";
import _ from "underscore";
import Posts from '/imports/db/posts/collection'

class PostService{
    postCreate(post){
        Posts.insert(post);
    }

    postEdit(_id, editedData){
        Posts.update({_id: _id}, {$set: editedData})
    }

    postRemove(_id){
        Posts.remove({_id: _id})
    }

    postGet(_id){
       return Posts.findOne({_id: _id})
    }

}
export default new PostService()