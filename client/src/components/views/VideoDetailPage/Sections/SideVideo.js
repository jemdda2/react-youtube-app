import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function SideVideo() {

    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {

        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.videos);
                    setSideVideos(response.data.videos);
                } else {
                    alert('ビデオインポートを失敗しました。');
                }
            })
    }, [])

    const rederSideVideo = sideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}>
                <div style={{ width: '40%', marginRight: '1rem' }}>
                    <a href style={{ color:'gray' }}>
                        <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    </a>
                </div>

                <div style={{ width: '50%' }}>
                    <a href style={{ color:'gray' }}>
                        <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                        <sapn>{video.writer.name}</sapn><br />
                        <sapn>{video.views} views</sapn><br />
                        <sapn>{minutes} : {seconds}</sapn>
                    </a>
                </div>
            </div>
    })

    return (

        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {rederSideVideo}
        </React.Fragment>

    )
}

export default SideVideo
