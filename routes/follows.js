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
            status: 'failed',
            message_error: err
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
            status: 'failed',
            message_error: err
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
            status: 'failed',
            message_error: err
        })
    })
});

router.get('/list-patient-follower', function (req, res, next) {
    if (!req.query.NguoiBiTheoDoi)
        req.query.NguoiBiTheoDoi = null
    followsRepo.getListPatientFollower(req.query.NguoiBiTheoDoi).then(rows => {
        if (rows.length > 0) {
            return res.status(200).json({
                list_doctors: rows,
                length: rows.length,
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Chưa có bác sĩ nào theo dõi bạn'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.get('/search-in-list-patient-follower', function (req, res, next) {
    if (!req.query.NguoiBiTheoDoi)
        req.query.NguoiBiTheoDoi = null
    if (!req.query.NguoiTheoDoi)
        req.query.NguoiTheoDoi = null
    followsRepo.getListPatientFollower(req.query.NguoiBiTheoDoi).then(rows => {
        if (rows.length > 0 ) {
            let arr = []
            rows.map((e, i) => {
                if (e.HoTen.indexOf(req.query.NguoiTheoDoi) >= 0)
                    arr.push(i)
            })
            if (arr.length != 0) {
                let result = []
                for (let i = 0; i < arr.length; i++)
                    result.push(rows[arr[i]])
                return res.status(200).json({
                    doctors: rows,
                    length: rows.length,
                    status: 'success'
                })
            }
            else {
                return res.status(200).json({
                    status: 'failed',
                    message_error: 'Không tìm thấy bác sĩ trong danh sách của bạn'
                })
            }     
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Chưa có bác sĩ nào theo dõi bạn'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

module.exports = router;
