import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'

function VideoDetailPage(props) {

    // URLからビデオIDを取得
    const videoId = props.match.params.videoId;
    const [VideoDetail, setVideoDetail] = useState([]);
    
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
    }, [])

    return (
        <Row>
            <Col lg={18} xs={24}>

                <div style={{ width: '100%', padding: '3rem 4rem' }}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar
                            title
                            description
                        />
                    </List.Item>

                    {/* {Comments} */}

                </div>

            </Col>
            <Col lg={6} xs={24}>
                Side Videos
            </Col>
        </Row>
    )
}

export default VideoDetailPage
