var express = require('express');
var SHA256 = require('crypto-js/sha256');

var doctorsRepo = require('../repos/doctors')
var constants = require('../constants')
var router = express.Router();

router.get('/', function (req, res, next) {
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
    var isFirstPage = false, 
        isLastPage = false;
    var current_page;
    var offset = (page - 1) * constants.DOCTORS_PER_PAGE;
    var p1 = doctorsRepo.loadAllDoctors(offset);
    var p2 = doctorsRepo.countDoctors();
    Promise.all([p1, p2]).then(([rows, countRows]) => {
        var total = countRows[0].total;
        var nPages = parseInt(total / constants.DOCTORS_PER_PAGE);
        if (total % constants.DOCTORS_PER_PAGE > 0) {
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
            total_doctor: total,
            doctors: rows,
            no_doctors: rows.length === 0,
            page_numbers: numbers,
            last_page: nPages,
            is_first_page: isFirstPage,
            is_last_page: isLastPage,
            total_page: nPages,
            current_page
        })
    }).catch((err) => {
        return res.status(200).json({
            error: err,
            status: 'failed'
        })
    })
});

router.post('/log-in', (req, res) => {
    var doctor = {
        MaBacSi: req.body.MaBacSi,
        Password: SHA256(req.body.Password).toString()
    };
    doctorsRepo.logInDoctor(doctor).then(row => {
        if (row.length > 0) {
            req.session.IsDoctorLogged = true;
            req.session.Doctor = row[0];
            return res.status(200).json({
                doctor: row[0],
                status: 'success'
            })
        } else {
            return res.status(200).json({
                is_doctor_logged: false,
                status: 'success'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            error: err,
            status: 'failed'
        })
    })
});

router.post('/sign-up', function (req, res, next) {
    var doctor = {
        MaBacSi: req.body.MaBacSi,
        Password: SHA256(req.body.Password).toString(),
        HoTen: req.body.HoTen,
        GioiTinh: req.body.GioiTinh, 
        NgaySinh: req.body.NgaySinh, 
        CMND: req.body.CMND, 
        DiaChi: req.body.DiaChi, 
        Email: req.body.Email, 
        TrinhDoChuyenMon: req.body.TrinhDoChuyenMon
    };
    doctorsRepo.existDoctor(doctor).then(row => {
        if (row.length > 0) {
            return res.status(200).json({
                is_exist: true,
                status: 'succsess'
            })
        }
        else {
            doctorsRepo.signUpDoctor(doctor).then(value => {
                req.session.IsDoctorLogged = true;
                req.session.Doctor = doctor
                return res.status(200).json({
                    doctor: doctor
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

router.get('/log-out', (req, res) => {
    req.session.IsDoctorLogged = false;
    req.session.Doctor = null;
    return res.status(200).json({
        status: 'success'
    })
});

module.exports = router;
