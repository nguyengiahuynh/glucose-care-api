var express = require('express');

var notificationsRepos = require('../repos/notifications');
var constants = require('../constants');
var router = express.Router();

router.get('/', function (req, res, next) {
  var page = req.query.page;
  if (!page) {
    page = 1;
  }
  var isFirstPage = false,
    isLastPage = false;
  var current_page;
  var offset = (page - 1) * constants.NOTIFICATIONS_PER_PAGE;
  var info = {
    MaTaiKhoan: req.query.MaTaiKhoan,
    LoaiNguoiChinh: req.query.LoaiNguoiChinh
  };

  var p1 = notificationsRepos.loadAll(info, offset);
  var p2 = notificationsRepos.countNotifications(info);
  Promise.all([p1, p2]).then(([rows, countRows]) => {
    var total = countRows[0].total;
    var nPages = parseInt(total / constants.NOTIFICATIONS_PER_PAGE);
    if (total % constants.NOTIFICATIONS_PER_PAGE > 0) {
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
      notifications: rows,
      no_notifications: rows.length === 0,
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

router.get('/numberNotificationsNotSeen', function (req, res, next) {
  var info = {
    MaTaiKhoan: req.query.MaTaiKhoan,
    LoaiTaiKhoan: req.query.LoaiTaiKhoan
  };

  notificationsRepos.countNotificationsNotSeen(info).then((row) => {
    if (row.length > 0) {
      return res.status(200).json({
        number: row[0],
        status: 'success'
      })
    }
    else {
      return res.status(200).json({
        status: 'failed',
        message_error: 'Tài khoản bạn tìm không tồn tại'
      })
    }
  }).catch((err) => {
    return res.status(200).json({
      status: 'failed',
      message_error: err
    })
  })
});

router.post('/newNotifications', function (req, res, next) {
  var date = new Date();
  var notification = {
    MaTaiKhoan: req.body.MaTaiKhoan, // nguoi se nhan thong bao nay
    LoaiNguoiChinh: req.body.LoaiNguoiChinh,
    MaTaiKhoanLienQuan: req.body.MaTaiKhoanLienQuan, // nguoi tao nen thong bao nay
    LoaiNguoiLienQuan: req.body.LoaiNguoiLienQuan, // 1: nguoi than, >1: cac loai bac si
    TenNguoiLienQuan: req.body.TenNguoiLienQuan,
    AvatarNguoiLienQuan: req.body.AvatarNguoiLienQuan,
    LoaiThongBao: req.body.LoaiThongBao,
    ThoiGian: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+ ' ' + date.getHours()+ ':' + date.getMinutes(),
    date: date,
  };
  var info = {
    MaTaiKhoan: req.body.MaTaiKhoan,
    LoaiTaiKhoan: req.body.LoaiNguoiChinh
  };

  var p1 = notificationsRepos.createNewNotification(notification);
  var p2 = notificationsRepos.increaseNotificationNotSeen(info);
  Promise.all([p1, p2]).then(([rows, countRows]) => {
    return res.status(200).json({
      notification: notification,
      id: rows.insertId,
      status: 'success'
    })
  }).catch((err) => {
    return res.status(200).json({
      status: 'failed',
      message_error: err
    })
  })
});

router.post('/seenThisNotification', function (req, res, next) {
  var notification = {
    Id: req.body.Id,
    MaTaiKhoan: req.body.MaTaiKhoan, // nguoi se nhan thong bao nay
    LoaiNguoiChinh: req.body.LoaiNguoiChinh,
  };

  notificationsRepos.seenThisNotification(notification).then((row) => {
    if (row.changedRows > 0)
      return res.status(200).json({
        message: 'Cập nhật thành công',
        status: 'success'
      })
    return res.status(200).json({
      status: 'failed',
      message_error: 'Lỗi cập nhật'
    })
  }).catch((err) => {
    return res.status(200).json({
      status: 'failed',
      message_error: err
    })
  })
});

router.post('/seenNotifications', function (req, res, next) {
  var info = {
    MaTaiKhoan: req.body.MaTaiKhoan,
    LoaiTaiKhoan: req.body.LoaiTaiKhoan,
  }; // nguoi se nhan thong bao nay

  notificationsRepos.seenNotifications(info).then((row) => {
    if (row.changedRows > 0)
      return res.status(200).json({
        message: 'Cập nhật thành công',
        status: 'success'
      })
    return res.status(200).json({
      status: 'failed',
      message_error: 'Lỗi cập nhật'
    })
  }).catch((err) => {
    return res.status(200).json({
      status: 'failed',
      message_error: err
    })
  })
});

module.exports = router;