import React, { useEffect , useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'


function Comment(props) {

    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");

    // 入力が可能になる
    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result);
                    setcommentValue("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert('コメント保存を失敗しました。');
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {/* {Coment Lists} */}
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                // responseToがない場合表示
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction}/>
                    </React.Fragment>
                )
            ))}

            {/* {Root Comment Form} */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="コメントを入力してください。"                
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
            </form>

        </div>
    )
}

export default Comment