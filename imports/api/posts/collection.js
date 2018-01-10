import { Mongo } from 'meteor/mongo';
import PostSchema from '/imports/api/posts/schema'
const Posts = new Mongo.Collection('posts');
Posts.attachSchema(PostSchema);
export default Posts;