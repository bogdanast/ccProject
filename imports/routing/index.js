import route from './router.js'
import Register from '/imports/ui/pages/user/Register'
import Login from '/imports/ui/pages/user/Login'
import PostCreate from '/imports/ui/pages/post/PostCreate'
import PostList from '/imports/ui/pages/post/PostList'
import PostEdit from '/imports/ui/pages/post/PostEdit'
import CommentView from '/imports/ui/pages/comment/CommentView'

route('/register', Register);
route('/login', Login);
route('/post/create', PostCreate);
route('/post/list', PostList);
route('/post/edit/:_id', PostEdit);
route("/post/comment", CommentView)