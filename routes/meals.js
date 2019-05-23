var express = require('express');

var mealsRepos = require('../repos/meals');
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
  var offset = (page - 1) * constants.MEALS_PER_PAGE;
  var info = {
    MaBenhNhan: req.query.MaBenhNhan,
  };

  var p1 = mealsRepos.loadAll(info, offset);
  var p2 = mealsRepos.countMeals(info);
  Promise.all([p1, p2]).then(([rows, countRows]) => {
    var total = countRows[0].total;
    var nPages = parseInt(total / constants.MEALS_PER_PAGE);
    if (total % constants.MEALS_PER_PAGE > 0) {
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
      total_meals: total,
      meals: rows,
      no_meals: rows.length === 0,
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

router.post('/deleteThisMeal', function (req, res, next) {
  var meal = {
    Id: req.body.Id,
    MaBenhNhan: req.body.MaBenhNhan,
  };

  mealsRepos.deleteThisMeal(meal).then((row) => {
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

router.get('/todayMeal', function (req, res, next) {
  var date = new Date()
  var meal = {
    MaBenhNhan: req.query.MaBenhNhan,
    Ngay: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
  };

  mealsRepos.todayMeal(meal).then((rows) => {
    return res.status(200).json({
      status: 'success',
      meals: rows
    })
  }).catch((err) => {
    return res.status(200).json({
      status: 'failed',
      message_error: err
    })
  })
});

router.post('/addThisMeal', function (req, res, next) {
  var meal = {
    MaBenhNhan: req.body.MaBenhNhan,
    MonAn: req.body.MonAn,
    Buoi: req.body.Buoi,
    Ngay: req.body.Ngay,
  };

  mealsRepos.addThisMeal(meal).then((row) => {
      return res.status(200).json({
        meal: meal,
        id: row.insertId,
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