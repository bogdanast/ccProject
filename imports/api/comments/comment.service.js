import Comments from '/imports/db/comments/collection'

class CommentService {
    add(data) {
        Comments.insert(data);
    }

    remove(_id) {
        Comments.remove({_id: _id})
    }

}

export default new CommentService()