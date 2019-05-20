var express = require('express');
var SHA256 = require('crypto-js/sha256');

var statisticsRepo = require('../repos/statistics')
var constants = require('../constants')
var router = express.Router();

router.get('/', function (req, res, next) {
    var MaBenhNhan = req.query.MaBenhNhan;
    var Loai = +req.query.Loai;
    if (Loai === 1) {
        statisticsRepo.load7LatestDaysOfStatistic(1, MaBenhNhan).then(result => {
            return res.status(200).json({
                blood_sugar: result,
                length: result.length,
                status: 'success'
            })
        }).catch((err) => {
            return res.status(200).json({
                status: 'failed',
                message_error: err
            })
        })
    }
    else if (Loai === 2) {
        var p1 = statisticsRepo.load7LatestDaysOfStatistic(2.1, MaBenhNhan);
        var p2 = statisticsRepo.load7LatestDaysOfStatistic(2.2, MaBenhNhan);
        var result = [];
        Promise.all([p1, p2]).then(([rows01, rows02]) => {
            rows01.map((bloodPressure01, index) => {
                const  bloodPressure02 =  rows02[index];
                var temp = {
                    blood_pressure01: bloodPressure01,
                    blood_pressure02: bloodPressure02
                }
                result.push(temp)
            })
            return res.status(200).json({
                blood_pressure: result,
                length: result.length,
                status: 'success'
            })
        }).catch((err) => {
            return res.status(200).json({
                status: 'failed',
                message_error: err
            })
        })
    }
});

router.post('/add', (req, res) => {
    var patient = {
        MaBenhNhan: req.body.MaBenhNhan,
        Loai: req.body.Loai,
        ChiSo: req.body.ChiSo,
        NgayNhap: req.body.NgayNhap
    };
    statisticsRepo.addMyStatistic(patient).then(() => {
        return res.status(200).json({
            my_statistic: patient,
            status: 'success'
        })
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
})

module.exports = router;
