import Comments from '/imports/db/comments/collection'

class CommentService{
    addComment(data){
        Comments.insert(data);
    }

    commentRemove(_id){
        Comments.remove({_id: _id})
    }

}
export default new CommentService()