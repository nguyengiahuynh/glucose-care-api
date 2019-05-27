var express = require('express');

var chatNotificationRepo = require('../repos/chatNotification')
var chatRepo = require('../repos/chats')
var router = express.Router();

// Tạo thông báo tin nhắn trong bảng tinh_trang_chat
// router.post('/create-chat-notification', function (req, res, next) {
//     if (!req.body.MaTaiKhoan)
//         req.body.MaTaiKhoan = null;
//     if (!req.body.LoaiMaTaiKhoan)
//         req.body.LoaiMaTaiKhoan = null;
//     if (!req.body.MaTaiKhoanLienQuan)
//         req.body.MaTaiKhoanLienQuan = null;
//     if (!req.body.LoaiMaTaiKhoanLienQuan)
//         req.body.LoaiMaTaiKhoanLienQuan = null;
//     if (!req.body.DangXem)
//         req.body.DangXem = null;
//     if (!req.body.DaXem)
//         req.body.DaXem = null;

//     var info = {
//         MaTaiKhoan: req.body.MaTaiKhoan,
//         LoaiMaTaiKhoan: req.body.LoaiMaTaiKhoan,
//         MaTaiKhoanLienQuan: req.body.MaTaiKhoanLienQuan,
//         LoaiMaTaiKhoanLienQuan: req.body.LoaiMaTaiKhoanLienQuan,
//         DangXem: req.body.DangXem,
//         DaXem: req.body.DaXem
//     }
//     chatNotificationRepo.create(info).then(results => {
//         if (results.length > 0) {
//             return res.status(200).json({
//                 status: 'success'
//             })
//         }
//         else {
//             return res.status(200).json({
//                 status: 'failed'
//             })
//         }
//     }).catch((err) => {
//         return res.status(200).json({
//             status: 'failed',
//             message_error: err
//         })
//     })
// });

// Cập nhật DangXem, DaXem khi vao màn hình chat
router.post('/update-seeing-seen-messages', function (req, res, next) {
    if (!req.body.MaTaiKhoan)
        req.body.MaTaiKhoan = null;
    if (!req.body.LoaiTaiKhoan)
        req.body.LoaiTaiKhoan = null;
    if (!req.body.MaTaiKhoanLienQuan)
        req.body.MaTaiKhoanLienQuan = null;
    if (!req.body.LoaiTaiKhoanLienQuan)
        req.body.LoaiTaiKhoanLienQuan = null;

    var info = {
        MaTaiKhoan: req.body.MaTaiKhoan,
        LoaiTaiKhoan: req.body.LoaiTaiKhoan,
        MaTaiKhoanLienQuan: req.body.MaTaiKhoanLienQuan,
        LoaiTaiKhoanLienQuan: req.body.LoaiTaiKhoanLienQuan
    }
    console.log(info);
    chatNotificationRepo.updateSeeingSeen(info).then(results => {
        if (results.length > 0) {
            return res.status(200).json({
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});

// Cập nhật DangXem khi thoát màn hình chat
router.post('/update-seeing-messages', function (req, res, next) {
    if (!req.body.MaTaiKhoan)
        req.body.MaTaiKhoan = null;
    if (!req.body.LoaiTaiKhoan)
        req.body.LoaiTaiKhoan = null;
    if (!req.body.MaTaiKhoanLienQuan)
        req.body.MaTaiKhoanLienQuan = null;
    if (!req.body.LoaiTaiKhoanLienQuan)
        req.body.LoaiTaiKhoanLienQuan = null;

    var info = {
        MaTaiKhoan: req.body.MaTaiKhoan,
        LoaiTaiKhoan: req.body.LoaiTaiKhoan,
        MaTaiKhoanLienQuan: req.body.MaTaiKhoanLienQuan,
        LoaiTaiKhoanLienQuan: req.body.LoaiTaiKhoanLienQuan
    }
    chatNotificationRepo.updateSeeing(info).then(results => {
        if (results.length > 0) {
            return res.status(200).json({
                status: 'success'
            })
        }
        else {
            return res.status(200).json({
                status: 'failed'
            })
        }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});


// Cập nhật DaXem
router.post('/update-seen-messages', function (req, res, next) {
    // if (!req.body.MaTaiKhoan)
    //     req.body.MaTaiKhoan = null;
    // if (!req.body.LoaiTaiKhoan)
    //     req.body.LoaiTaiKhoan = null;
    // if (!req.body.MaTaiKhoanLienQuan)
    //     req.body.MaTaiKhoanLienQuan = null;
    // if (!req.body.LoaiTaiKhoanLienQuan)
    //     req.body.LoaiTaiKhoanLienQuan = null;

    var info = {
        MaTaiKhoan: req.body.chat.MaNguoiNhan,
        LoaiTaiKhoan: req.body.chat.LoaiNguoiNhan,
        MaTaiKhoanLienQuan: req.body.chat.MaNguoiGui,
        LoaiTaiKhoanLienQuan: req.body.chat.LoaiNguoiGui
    }
    var p1 = chatRepo.addChat(req.body.chat);
    var p2 = chatNotificationRepo.updateSeen(info);
    Promise.all([p1, p2]).then(([rows1, rows2]) => {
        // console.log(rows2)
        // if (rows2.length > 0) {
            return res.status(200).json({
                changedRows: rows2.changedRows,
                chat: req.body.chat,
                status: 'success'
            })
        // }
        // else {
        //     return res.status(200).json({
        //         status: 'failed'
        //     })
        // }
    }).catch((err) => {
        return res.status(200).json({
            status: 'failed',
            message_error: err
        })
    })
});


module.exports = router;
