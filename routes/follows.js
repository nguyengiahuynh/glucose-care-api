var express = require('express');

var followsRepo = require('../repos/follows')
var router = express.Router();

router.post('/wait', function (req, res, next) {
    if (!req.body.NguoiTheoDoi)
        req.body.NguoiTheoDoi = null;
    if (!req.body.NguoiBiTheoDoi)
        req.body.NguoiBiTheoDoi = null;
    followsRepo.existConnection(req.body.NguoiTheoDoi, req.body.NguoiBiTheoDoi).then(row => {
        if (row.length > 0) {
            followsRepo.followed(req.body.NguoiTheoDoi, req.body.NguoiBiTheoDoi).then(value => {
                return res.status(200).json({
                    status: 'success'
                })
            })
        }
        else {
            followsRepo.waitAccept(req.body.NguoiTheoDoi, req.body.NguoiBiTheoDoi).then(value => {
                return res.status(200).json({
                    status: 'success'
                })
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            error: err,
            status: 'failed'
        })
    })
});

router.post('/followed', function (req, res, next) {
    if (!req.body.NguoiTheoDoi)
        req.body.NguoiTheoDoi = null;
    if (!req.body.NguoiBiTheoDoi)
        req.body.NguoiBiTheoDoi = null;
    followsRepo.followed(req.body.NguoiTheoDoi, req.body.NguoiBiTheoDoi).then(row => {
        return res.status(200).json({
            status: 'success'
        })
    }).catch((err) => {
        return res.status(200).json({
            error: err,
            status: 'failed'
        })
    })
});

router.post('/unfollowed', function (req, res, next) {
    if (!req.body.NguoiTheoDoi)
        req.body.NguoiTheoDoi = null;
    if (!req.body.NguoiBiTheoDoi)
        req.body.NguoiBiTheoDoi = null;
    followsRepo.unfollowed(req.body.NguoiTheoDoi, req.body.NguoiBiTheoDoi).then(row => {
        return res.status(200).json({
            status: 'success'
        })
    }).catch((err) => {
        return res.status(200).json({
            error: err,
            status: 'failed'
        })
    })
});

module.exports = router;
