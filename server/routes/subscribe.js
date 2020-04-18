const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {

    // チャンネル登録数を取得
    Subscriber.find({ "userTo": req.body.userTo })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length  })
    })
})

router.post('/subscribed', (req, res) => {

    // チャンネル登録を確認
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            let result = false;
            if(subscribe.length !== 0) {
                result = true;
            }
            res.status(200).json({ success: true, subscribed: result })
        })
})

router.post('/unSubscribe', (req, res) => {

    // チャンネル取り消し
    Subscriber.findOneAndDelete({ userTo:req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send({ success: false, err })
            return res.status(200).json({ success: true, doc })
        })
})

router.post('/subscribe', (req, res) => {

    // req情報を取得
    const subscriber = new Subscriber(req.body);
    
    // チャンネル登録
    subscriber.save((err, doc) =>{
        if(err) return res.status(400).send({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

module.exports = router;