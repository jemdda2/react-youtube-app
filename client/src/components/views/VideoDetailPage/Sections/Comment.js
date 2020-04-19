import React, { useEffect , useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';

function Comment(props) {

    const videoId = props.postId;
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
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result);
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

            {/* {Comment Lists} */}

            {/* {Root Comment Form} */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{  width: '100%', borderRadius: '5px'}}
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