var express = require('express');

var followsRepo = require('../repos/follows')
var chatNotificationRepo = require('../repos/chatNotification')
var router = express.Router();

router.post('/get-status-connection', function (req, res, next) {
    if (!req.body.NguoiTheoDoi)
        req.body.NguoiTheoDoi = null;
    if (!req.body.NguoiBiTheoDoi)
        req.body.NguoiBiTheoDoi = null;
    followsRepo.existConnection(req.body.NguoiTheoDoi, req.body.NguoiBiTheoDoi).then(row => {
        if (row.length > 0) {
            return res.status(200).json({
                connection: row[0],
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                connection: null,
                status: 'success'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.post('/wait', function (req, res, next) {
    if (!req.body.NguoiTheoDoi)
        req.body.NguoiTheoDoi = null;
    if (!req.body.NguoiBiTheoDoi)
        req.body.NguoiBiTheoDoi = null;
    if (!req.body.LoaiNguoiTheoDoi)
        req.body.LoaiNguoiTheoDoi = 0;
    if (!req.body.LoaiNguoiBiTheoDoi)
        req.body.LoaiNguoiBiTheoDoi = 0;
    var data = {
        NguoiTheoDoi: req.body.NguoiTheoDoi,
        LoaiNguoiTheoDoi: req.body.LoaiNguoiTheoDoi,
        NguoiBiTheoDoi: req.body.NguoiBiTheoDoi,
        LoaiNguoiBiTheoDoi: req.body.LoaiNguoiBiTheoDoi
    }
    followsRepo.existConnection(data).then(row => {
        if (row.length > 0) {
            followsRepo.updateWaitAccept(data).then(value => {
                return res.status(200).json({
                    status: 'success'
                })
            })
        }
        else {
            followsRepo.waitAccept(data).then(value => {
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
        if (!req.body.LoaiNguoiTheoDoi)
        req.body.LoaiNguoiTheoDoi = 0;
    if (!req.body.LoaiNguoiBiTheoDoi)
        req.body.LoaiNguoiBiTheoDoi = 0;
    var data = {
        NguoiTheoDoi: req.body.NguoiTheoDoi,
        LoaiNguoiTheoDoi: req.body.LoaiNguoiTheoDoi,
        NguoiBiTheoDoi: req.body.NguoiBiTheoDoi,
        LoaiNguoiBiTheoDoi: req.body.LoaiNguoiBiTheoDoi
    }
    var info1 = {
        MaTaiKhoan: req.body.NguoiTheoDoi,
        LoaiTaiKhoan: req.body.LoaiNguoiTheoDoi,
        MaTaiKhoanLienQuan: req.body.NguoiBiTheoDoi,
        LoaiTaiKhoanLienQuan: req.body.LoaiNguoiBiTheoDoi
    }
    var info2 = {
        MaTaiKhoan: req.body.NguoiBiTheoDoi,
        LoaiTaiKhoan: req.body.LoaiNguoiBiTheoDoi,
        MaTaiKhoanLienQuan: req.body.NguoiTheoDoi,
        LoaiTaiKhoanLienQuan: req.body.LoaiNguoiTheoDoi
    }
    var p1 = followsRepo.followed(data);
    var p2 = chatNotificationRepo.create(info1);
    var p3 = chatNotificationRepo.create(info2);
    Promise.all([p1, p2, p3]).then(([rows1, rows2, rows3]) => {
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
        if (!req.body.LoaiNguoiTheoDoi)
        req.body.LoaiNguoiTheoDoi = 0;
    if (!req.body.LoaiNguoiBiTheoDoi)
        req.body.LoaiNguoiBiTheoDoi = 0;
    var data = {
        NguoiTheoDoi: req.body.NguoiTheoDoi,
        LoaiNguoiTheoDoi: req.body.LoaiNguoiTheoDoi,
        NguoiBiTheoDoi: req.body.NguoiBiTheoDoi,
        LoaiNguoiBiTheoDoi: req.body.LoaiNguoiBiTheoDoi
    }
    followsRepo.unfollowed(data).then(row => {
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

router.get('/list-relations-of-patient', function (req, res, next) {
    if (!req.query.NguoiBiTheoDoi)
        req.query.NguoiBiTheoDoi = null;
    followsRepo.getListRelationsOfPatient(req.query.NguoiBiTheoDoi).then(rows => {
        if (rows.length > 0) {
            return res.status(200).json({
                list_relations: rows,
                length: rows.length,
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Chưa có người thân nào theo dõi bạn'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.get('/list-doctors-of-patient', function (req, res, next) {
    if (!req.query.NguoiBiTheoDoi)
        req.query.NguoiBiTheoDoi = null;
    followsRepo.getListDoctorsOfPatient(req.query.NguoiBiTheoDoi).then(rows => {
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

router.get('/list-doctor-following', function (req, res, next) {
    if (!req.query.MaBacSi)
        req.query.MaBacSi = null;
    console.log(req.query);
    followsRepo.getListDoctorFollowing(req.query.MaBacSi).then(rows => {
        if (rows.length > 0) {
            return res.status(200).json({
                list_patients: rows,
                length: rows.length,
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Bác sĩ chưa theo dõi bệnh nhân nào'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.get('/patient-following-by-doctor', function (req, res, next) {
    if (!req.query.MaBenhNhan)
        req.query.MaBenhNhan = null;
    console.log(req.query);
    followsRepo.getInforPatientFollowingByDoctor(req.query.MaBenhNhan).then(rows => {
        if (rows.length > 0) {
            return res.status(200).json({
                patient: rows[0],
                length: rows.length,
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed',
                message_error: 'Bác sĩ chưa theo dõi bệnh nhân nào'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.get('/check-relationship-of-patient', function (req, res, next) {
    if (!req.query.MaBenhNhan1)
        req.query.MaBenhNhan1 = null;
    if (!req.query.MaBenhNhan2)
        req.query.MaBenhNhan2 = null;

    var p1 = followsRepo.check_isFollowOfPatient(req.query.MaBenhNhan1, req.query.MaBenhNhan2);
    var p2 = followsRepo.check_isRequestOfPatient(req.query.MaBenhNhan1, req.query.MaBenhNhan2);
    Promise.all([p1, p2]).then(([rows1, rows2]) => {
        if (rows1.length > 0) {
            return res.status(200).json({
                typeRelationship: 'followed',
                status: 'success'
            })
        }
        if (rows2.length > 1) {
            return res.status(200).json({
                typeRelationship: 'accept',
                status: 'success'
            })
        }
        if (rows2.length > 0) {
            if (rows2[0].NguoiTheoDoi === req.query.MaBenhNhan2) {
                return res.status(200).json({
                    typeRelationship: 'accept',
                    status: 'success'
                })
            }
            else {
                return res.status(200).json({
                    typeRelationship: 'cancel',
                    status: 'success'
                })
            }
        }
        return res.status(200).json({
            typeRelationship: 'add',
            status: 'success'
        })
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

router.get('/check-relationship-of-patient-with-doctor', function (req, res, next) {
	if (!req.query.MaBenhNhan)
            req.query.MaBenhNhan = null;
    if (!req.query.MaBacSi)
            req.query.MaBacSi = null;

    var p1 = followsRepo.isFollow_PatientDoctor(req.query.MaBenhNhan, req.query.MaBacSi);
    var p2 = followsRepo.isRequest_PatientDoctor(req.query.MaBenhNhan, req.query.MaBacSi);
    Promise.all([p1, p2]).then(([rows1, rows2]) => {
        if (rows1.length > 0) {
            return res.status(200).json({
                typeRelationship: 'followed',
                status: 'success'
            })
        }
        if (rows2.length > 1) {
            return res.status(200).json({
                typeRelationship: 'accept',
                status: 'success'
            })
        }
        if (rows2.length > 0) {
            if (rows2[0].NguoiTheoDoi === req.query.MaBacSi && rows2[0].LoaiNguoiTheoDoi === 2) {
                return res.status(200).json({
                    typeRelationship: 'accept', 
                    status: 'success'
                })
            }
            else {
                return res.status(200).json({
                    typeRelationship: 'cancel',
                    status: 'success'
                })
            }
        }
        return res.status(200).json({
            typeRelationship: 'add',
            status: 'success'
        })
	}).catch((err) => {
		return res.status(200).json({
			status: 'failed',
			message_error: err
		})
	})
});



// router.get('/search-in-list-patient-follower', function (req, res, next) {
//     if (!req.query.NguoiBiTheoDoi)
//         req.query.NguoiBiTheoDoi = null
//     if (!req.query.NguoiTheoDoi)
//         req.query.NguoiTheoDoi = null
//     followsRepo.getListPatientFollower(req.query.NguoiBiTheoDoi).then(rows => {
//         if (rows.length > 0 ) {
//             let arr = []
//             rows.map((e, i) => {
//                 if (e.HoTen.indexOf(req.query.NguoiTheoDoi) >= 0)
//                     arr.push(i)
//             })
//             if (arr.length != 0) {
//                 let result = []
//                 for (let i = 0; i < arr.length; i++)
//                     result.push(rows[arr[i]])
//                 return res.status(200).json({
//                     doctors: rows,
//                     length: rows.length,
//                     status: 'success'
//                 })
//             }
//             else {
//                 return res.status(200).json({
//                     status: 'failed',
//                     message_error: 'Không tìm thấy bác sĩ trong danh sách của bạn'
//                 })
//             }     
//         }
//         else {
//             return res.status(200).json({
//                 status: 'failed',
//                 message_error: 'Chưa có bác sĩ nào theo dõi bạn'
//             })
//         }
//     }).catch((err) => {
//         return res.status(200).json({
//             status: 'failed',
//             message_error: err
//         })
//     })
// });

module.exports = router;
