var express = require('express');
var SHA256 = require('crypto-js/sha256');

var patientsRepo = require('../repos/patients')
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
    var offset = (page - 1) * constants.PATIENTS_PER_PAGE;
    var p1 = patientsRepo.loadAllPatients(offset);
    var p2 = patientsRepo.countPatients();
    Promise.all([p1, p2]).then(([rows, countRows]) => {
        var total = countRows[0].total;
        var nPages = parseInt(total / constants.PATIENTS_PER_PAGE);
        if (total % constants.PATIENTS_PER_PAGE > 0) {
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
            total_patient: total,
            patients: rows,
            no_patients: rows.length === 0,
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
});

router.get('/find-patient-by-id', function (req, res, next) {
    var MaBenhNhan = req.query.MaBenhNhan;
    patientsRepo.findPatientById(MaBenhNhan).then((row) => {
        if (row.length > 0) {
            return res.status(200).json({
                patient: row,
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Bệnh nhân bạn tìm không tồn tại'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.post('/log-in', (req, res) => {
    var patient = {
        MaBenhNhan: req.body.MaBenhNhan,
        Password: SHA256(req.body.Password).toString()
    };
    patientsRepo.logInPatient(patient).then(row => {
        if (row.length > 0) {
            req.session.IsPatientLogged = true;
            req.session.Patient = row[0];
            return res.status(200).json({
                patient: row[0],
                status: 'success'
            })
        } else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Tên tài khoản hoặc mật khẩu không đúng'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.post('/sign-up', function (req, res, next) {
    if (!req.body.MaBenhNhan)
        req.body.MaBenhNhan = null;
    if (!req.body.Password)
        req.body.Password = null;
    if (!req.body.HoTen)
        req.body.HoTen = null;
    var patient = {
        MaBenhNhan: req.body.MaBenhNhan,
        Password: SHA256(req.body.Password).toString(),
        HoTen: req.body.HoTen
    };
    patientsRepo.existPatient(patient).then((row) => {
        if (row.length > 0) {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Tên tài khoản đã tồn tạiW'
            })
        }
        else {
            patientsRepo.signUpPatient(patient).then((value) => {
                req.session.IsPatientLogged = true;
                req.session.Patient = patient
                return res.status(200).json({
                    patient: patient,
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

router.get('/log-out', (req, res) => {
    req.session.IsPatientLogged = false;
    req.session.Patient = null;
    return res.status(200).json({
        status: 'success'
    })
});

router.get('/find-patient-by-name', function (req, res, next) {
    var HoTen = req.query.HoTen;
    patientsRepo.findPatientByName(HoTen).then((row) => {
        if (row.length > 0) {
            return res.status(200).json({
                patient: row,
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Bệnh nhân bạn tìm không tồn tại'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.post('/change-password', function (req, res, next) {
    var patient = {
        MaBenhNhan: req.body.MaBenhNhan,
        OldPassword: SHA256(req.body.OldPassword).toString(),
        NewPassword: SHA256(req.body.NewPassword).toString()
    };
    patientsRepo.getOldPassword(patient).then(data => {
        if (data[0].Password === patient.OldPassword) {
            patientsRepo.changePassword(patient).then(row => {
                return res.status(200).json({
                    patient: patient,
                    status: 'success'
                })
            }).catch((err) => {
                return res.status(200).json({
                    status: 'failed',
                    message_error: err
                })
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Mật khẩu cũ không đúng'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.post('/update-profile', function (req, res, next) {
    if (!req.body.HoTen)
        req.body.HoTen = null;
    if (!req.body.Avatar)
        req.body.Avatar = null;
    if (!req.body.GioiTinh)
        req.body.GioiTinh = null;
    if (!req.body.NgaySinh)
        req.body.NgaySinh = null;
    if (!req.body.CMND)
        req.body.CMND = null;
    if (!req.body.DiaChi)
        req.body.DiaChi = null;
    if (!req.body.Email)
        req.body.Email = null;
    if (!req.body.NgheNghiep)
        req.body.NgheNghiep = null;
    if (!req.body.NhomMau)
        req.body.NhomMau = null;
    if (!req.body.DiUngThuoc)
        req.body.DiUngThuoc = null;
    var patient = {
        MaBenhNhan: req.body.MaBenhNhan,
        Avatar: req.body.Avatar,
        HoTen: req.body.HoTen,
        GioiTinh: req.body.GioiTinh,
        NgaySinh: req.body.NgaySinh,
        CMND: req.body.CMND,
        DiaChi: req.body.DiaChi,
        Email: req.body.Email,
        NgheNghiep: req.body.NgheNghiep,
        NhomMau: req.body.NhomMau,
        DiUngThuoc: req.body.DiUngThuoc,
    };
    patientsRepo.updateProfile(patient).then(row => {
        return res.status(200).json({
            patient: patient,
            status: 'success'
        })
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.post('/add-my-statistic', (req, res) => {
    var patient = {
        MaBenhNhan: req.body.MaBenhNhan,
        Loai: req.body.Loai,
        ChiSo: req.body.ChiSo,
        NgayNhap: req.body.NgayNhap
    };
    patientsRepo.addMyStatistic(patient).then(() => {
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
});

router.post('/forget-password', function (req, res, next) {
    
    var acc = {
        MaBenhNhan: req.body.MaBenhNhan,
		NewPassword: SHA256(req.body.NewPassword).toString()};
    patientsRepo.changePassword(acc).then(row => {
        return res.status(200).json({
            acc: acc,
            status: 'success'
        })
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

module.exports = router;
