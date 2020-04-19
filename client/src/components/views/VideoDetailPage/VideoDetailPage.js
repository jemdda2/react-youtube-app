import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'

function VideoDetailPage(props) {

    // URLからビデオIDを取得
    const videoId = props.match.params.videoId;
    const [VideoDetail, setVideoDetail] = useState([]);
    const [CommentLists, setCommentLists] = useState([])
    
    const variable = { 
        videoId: videoId 
    }

    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    console.log("VideoDetail", response.data.videoDetail);
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert('ビデオ情報の取得を失敗しました。');
                }
            })

        Axios.post('/api/comment/getComments', variable)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.comments);
                setCommentLists(response.data.comments);
            } else {
                alert('コメント情報の取得を失敗しました。');
            }
        })
    }, [])

    const refreshFunction = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if(VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId')  
                                && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row>
                <Col lg={18} xs={24}>

                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[ subscribeButton ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        <Comment refreshFunction={refreshFunction} CommentLists={CommentLists} postId={videoId} />
                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage
