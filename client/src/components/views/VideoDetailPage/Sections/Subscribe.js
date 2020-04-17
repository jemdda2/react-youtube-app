import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { response } from 'express';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {

        let variable = { userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('subscribeの情報を取得できませんでした。');
                }
            })

        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }


        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then( response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('情報を取得できませんでした。');
                }
            })
        
    }, [])

    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: ,
            
        }

        if(Subscribed) {
            Axios.post('/api/subscribe/onSubscribe')
                .then(response => {

                })
        } else {

        }
    }

    return (
        <div>
            <button
                style={{
                    background: `${Subscribe ? '#CC0000' : '#AAAAAA' }`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
               {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
