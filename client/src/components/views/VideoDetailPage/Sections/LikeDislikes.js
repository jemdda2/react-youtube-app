import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DisLikeAction, setDisLikeAction] = useState(null);

    let variable = {};

    if(props.video) {
        variable = { 
            videoId: props.videoId,
            userId: props.userId
        }
    } else {
        variable = { 
            commentId: props.commentId,
            userId: props.userId
        }
    }
    
    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    // 押されたLIKE数
                    setLikes(response.data.likes.length)
                    // 自分が既にLIKE押されたかを確認
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked');
                        }
                    })

                } else {
                    alert('Like情報の取得を失敗しました。')
                }
            })

        Axios.post('/api/like/getDilikes', variable)
            .then(response => {
                if(response.data.success) {
                    // 押されたDISLIKE数
                    setDislikes(response.data.dislikes.length)
                    // 自分が既にDISLIKE押されたかを確認
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDisLikeAction('disliked');
                        }
                    })

                } else {
                    alert('Dislike情報の取得を失敗しました。')
                }
            })
                
    }, [])

    const onLike = () => {
        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');

                        if(DisLikeAction !== null) {
                            setDisLikeAction(null);
                            setDislikes(Dislikes -1);
                        }
                    } else {
                        alert('LikeUpを失敗しました。')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1);
                        setLikeAction(null);
                    } else {
                        alert('LikeDownを失敗しました。')
                    }
                })
        }
    }

    const onDislike = () => {
        if(DisLikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1);
                        setDisLikeAction(null);
                    } else {
                        alert('Dislikeの削除を失敗しました。');
                    }
                })
        } else {
            Axios.post('/api/like/upDislike', variable)
            .then(response => {
                if (response.data.success) {
                    setDislikes(Dislikes + 1);
                    setDisLikeAction('disliked');

                    if(LikeAction !== null) {
                        setLikeAction(null);
                        setLikes(Likes -1);
                    }
                } else {
                    alert('Dislikeの削除を失敗しました。');
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> { Likes } </span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> { Dislikes } </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
