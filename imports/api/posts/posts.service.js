import {Posts} from '/imports/db'

class PostService {
    create(post) {
        Posts.insert(post);
    }

    edit(_id, editedData) {
        Posts.update({_id: _id}, {$set: editedData})
    }

    remove(_id) {
        Posts.remove({_id: _id})
    }

    get(_id) {
        return Posts.findOne({_id: _id})
    }

}

export default new PostService()