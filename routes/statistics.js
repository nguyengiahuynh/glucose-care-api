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
                    Loai: 2,
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

router.get('/getPerDay', function (req, res, next) {
    var MaBenhNhan = req.query.MaBenhNhan;
    var Loai = +req.query.Loai;
    var Ngay = req.query.Ngay;

    var page = req.query.page;
    console.log(Loai + Ngay + page + MaBenhNhan);
    if (!page) {
        page = 1;
    }
    var isFirstPage = false,
      isLastPage = false;
    var current_page;
    var offset = (page - 1) * constants.STATISTICS_PER_PAGE;

    if (Loai === 1) {
        var p1 = statisticsRepo.loadStatisticPerDay(offset,1, MaBenhNhan, Ngay);
        var p2 = statisticsRepo.countStatistics(1, MaBenhNhan, Ngay);
        Promise.all([p1, p2]).then(([rows, countRows]) => {
            var total = countRows[0].total;
            var nPages = parseInt(total / constants.STATISTICS_PER_PAGE);
            if (total % constants.STATISTICS_PER_PAGE > 0) {
                nPages++;
            }

            if (+page === 1)
                isFirstPage = true;
            if (+page === nPages)
                isLastPage = true;

            var numbers = [];
            if (nPages > 2) {
                if (+page === 1)
                    for (var i = 1; i <= 3; i++)
                        numbers.push({
                            value: i,
                            isCurPage: i === +page,
                        });
                else if (+page === nPages)
                    for (var i = nPages - 2; i <= nPages; i++)
                        numbers.push({
                            value: i,
                            isCurPage: i === +page
                        });
                else {
                    numbers.push({
                        value: +page - 1,
                        isCurPage: false
                    });
                    numbers.push({
                        value: +page,
                        isCurPage: true
                    });
                    numbers.push({
                        value: +page + 1,
                        isCurPage: false
                    });
                }
            } else if (nPages < 2) {
                isFirstPage = true;
                isLastPage = true;
                numbers.push({
                    value: +page,
                    isCurPage: true
                });
            } else {
                if (+page === 1) {
                    isFirstPage = true;
                    isLastPage = false;
                    numbers.push({
                        value: +page,
                        isCurPage: true
                    });
                    numbers.push({
                        value: +page + 1,
                        isCurPage: false
                    });
                } else {
                    isFirstPage = false;
                    isLastPage = true;
                    numbers.push({
                        value: +page - 1,
                        isCurPage: false
                    });
                    numbers.push({
                        value: +page,
                        isCurPage: true
                    });
                }
            }

            for (var i = 0; i < numbers.length; i++)
                if (numbers[i].isCurPage == true) {
                    current_page = numbers[i].value;
                    break;
                }

            return res.status(200).json({
                total_statistics: total,
                loai: 1,
                blood_sugar: rows,
                no_statistics: rows.length === 0,
                page_numbers: numbers,
                last_page: nPages,
                is_first_page: isFirstPage,
                is_last_page: isLastPage,
                total_page: nPages,
                current_page,
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
        var p1 = statisticsRepo.loadStatisticPerDay(offset, 2.1, MaBenhNhan, Ngay);
        var p2 = statisticsRepo.loadStatisticPerDay(offset, 2.2, MaBenhNhan, Ngay);
        var p3 = statisticsRepo.countStatistics(2.1, MaBenhNhan, Ngay);

        Promise.all([p1, p2, p3]).then(([rows01, rows02, countRows]) => {
            var total = countRows[0].total;
            var nPages = parseInt(total / constants.STATISTICS_PER_PAGE);
            if (total % constants.STATISTICS_PER_PAGE > 0) {
                nPages++;
            }

            if (+page === 1)
                isFirstPage = true;
            if (+page === nPages)
                isLastPage = true;

            var numbers = [];
            if (nPages > 2) {
                if (+page === 1)
                    for (var i = 1; i <= 3; i++)
                        numbers.push({
                            value: i,
                            isCurPage: i === +page,
                        });
                else if (+page === nPages)
                    for (var i = nPages - 2; i <= nPages; i++)
                        numbers.push({
                            value: i,
                            isCurPage: i === +page
                        });
                else {
                    numbers.push({
                        value: +page - 1,
                        isCurPage: false
                    });
                    numbers.push({
                        value: +page,
                        isCurPage: true
                    });
                    numbers.push({
                        value: +page + 1,
                        isCurPage: false
                    });
                }
            } else if (nPages < 2) {
                isFirstPage = true;
                isLastPage = true;
                numbers.push({
                    value: +page,
                    isCurPage: true
                });
            } else {
                if (+page === 1) {
                    isFirstPage = true;
                    isLastPage = false;
                    numbers.push({
                        value: +page,
                        isCurPage: true
                    });
                    numbers.push({
                        value: +page + 1,
                        isCurPage: false
                    });
                } else {
                    isFirstPage = false;
                    isLastPage = true;
                    numbers.push({
                        value: +page - 1,
                        isCurPage: false
                    });
                    numbers.push({
                        value: +page,
                        isCurPage: true
                    });
                }
            }

            for (var i = 0; i < numbers.length; i++)
                if (numbers[i].isCurPage == true) {
                    current_page = numbers[i].value;
                    break;
                }

            var result = [];
            rows01.map((bloodPressure01, index) => {
                const  bloodPressure02 =  rows02[index];
                var temp = {
                    Loai: 2,
                    blood_pressure01: bloodPressure01,
                    blood_pressure02: bloodPressure02
                }
                result.push(temp)
            })

            return res.status(200).json({
                total_statistics: total,
                loai: 2,
                blood_pressure: result,
                no_statistics: rows01.length === 0,
                page_numbers: numbers,
                last_page: nPages,
                is_first_page: isFirstPage,
                is_last_page: isLastPage,
                total_page: nPages,
                current_page,
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

module.exports = router;
