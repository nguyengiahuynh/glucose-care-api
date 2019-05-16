var express = require('express');

var chatsRepo = require('../repos/chats')
var constants = require('../constants')
var router = express.Router();

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

router.get('/', function (req, res, next) {
    var MaNguoiGui = req.query.MaNguoiGui;
    var MaNguoiNhan = req.query.MaNguoiNhan;
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
    var isFirstPage = false,
        isLastPage = false;
    var current_page;
    var offset = (page - 1) * constants.CHATS_PER_PAGE;
    var p1 = chatsRepo.getChat(MaNguoiGui, MaNguoiNhan, offset);
    var p2 = chatsRepo.countChats(MaNguoiGui, MaNguoiNhan);
    Promise.all([p1, p2]).then(([rows, countRows]) => {
        var total = countRows[0].total;
        var nPages = parseInt(total / constants.CHATS_PER_PAGE);
        if (total % constants.CHATS_PER_PAGE > 0) {
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
            total_chat: total,
            chats: rows,
            no_chats: rows.length === 0,
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

router.post('/', function (req, res, next) {
    // var chat = {
    //     MaNguoiGui: req.body.MaNguoiGui,
    //     MaNguoiNhan: req.body.MaNguoiNhan,
    //     NoiDung: req.body.NoiDung,
    //     NgayGioGui: req.body.NgayGioGui
    // };
    // chatsRepo.addChat(chat).then(() => {
    //     return res.status(200).json({
    //         chat: chat,
    //         status: 'success'
    //     })
    // }).catch((err) => {
    //     return res.status(200).json({
    //         error: err,
    //         status: 'failed'
    //     })
    // })
});

module.exports = router;
