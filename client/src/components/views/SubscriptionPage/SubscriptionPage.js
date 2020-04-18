import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() => {

        let SubscriptionVariable = {
            userFrom: localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos', SubscriptionVariable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.videos);
                    setVideo(response.data.videos);
                } else {
                    alert('ビデオインポートを失敗しました。');
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Subscribed Videos </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default SubscriptionPage
