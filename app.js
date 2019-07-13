var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var cors = require('cors');
var axios = require('axios');

var indexRouter = require('./routes/index');
var doctorsRouter = require('./routes/doctors');
var patientsRouter = require('./routes/patients');
var chatsRouter = require('./routes/chats');
var followsRouter = require('./routes/follows');
var statisticsRouter = require('./routes/statistics');
var notificationsRouter = require('./routes/notifications');
var mealsRouter = require('./routes/meals');
var chatNotificationRouter = require('./routes/chatNotification');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatsRepo = require('./repos/chats');

var admin = require("firebase-admin");

var serviceAccount = require("./fn/service-account-file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://udtdbntd.firebaseio.com"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5500',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTION'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
var sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  // password: 'password',
  user: 'root',
  database: 'glucose_care',
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  unset: 'destroy',
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: false
  }, // 30 days
}));

app.use('/', indexRouter);
app.use('/doctors', doctorsRouter);
app.use('/patients', patientsRouter);
app.use('/chats', chatsRouter);
app.use('/follows', followsRouter);
app.use('/statistics', statisticsRouter);
app.use('/notifications', notificationsRouter);
app.use('/meals', mealsRouter);
app.use('/chatnotifications', chatNotificationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.patientId = Object;
global.doctorId = Object;

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('join room', function (info) {
    // if (info.loai === 1)
    //   global.patientId[info.id] = socket.id
    // else if (info.loai === 2)
    //   global.doctorId[info.id] = socket.id
    console.log('join');
    socket.join(`${info.LoaiTaiKhoan}/${info.MaTaiKhoan}`);
  });
  socket.emit('rejoin room', function (info) {
    console.log('rejoin')
    // socket.join(`${info.LoaiTaiKhoan}/${info.MaTaiKhoan}`);
  });
  socket.on('leave room', function (info) {
    console.log('leave room')
    socket.leave(`${info.LoaiTaiKhoan}/${info.MaTaiKhoan}`);
  });
  socket.on('chat message', function (chat) {
    axios.post('http://localhost:5500/chatnotifications/update-seen-messages', {chat: chat})
    
    .then((result) => {
      if (result.data.changedRows > 0){
        io.to(`${chat.LoaiNguoiGui}/${chat.MaNguoiGui}`).emit('not seen message')
      }
      io.to(`${chat.LoaiNguoiGui}/${chat.MaNguoiGui}`).emit('chat message', chat)
	    io.to(`${chat.LoaiNguoiNhan}/${chat.MaNguoiNhan}`).emit('chat message', chat)
      //console.log(chat.NoiDung);
    }).catch((err) => {
        return err;
    })
  })
  socket.on('update relationship', function (info) {
    // khi thao tác liên quan đến relationship thì sẽ gọi vào đây
    // để thông báo cho client refresh lại list và profile
    io.to(`${info.LoaiNguoiGui}/${info.MaNguoiGui}`).emit('update relationship', info)
    io.to(`${info.LoaiNguoiNhan}/${info.MaNguoiNhan}`).emit('update relationship', info)
  })
  socket.on('create notifications', function (info) {
    axios.post('http://localhost:5500/notifications/newNotifications', info)
      .then((result) => {
        if (result.data.status==='success') {
          // if (global.patientId[result.data.MaTaiKhoan] && result.data.LoaiNguoiChinh===1) {
          //   io.to(global.patientId[result.data.MaTaiKhoan]).emit('update notifications number')
          //   io.to(global.patientId[result.data.MaTaiKhoan]).emit('update list notifications', result.data.notification, result.data.id)
          // }
          // else if (global.doctorId[result.data.MaTaiKhoan] && result.data.LoaiNguoiChinh===2) {
          //   io.to(global.doctorId[result.data.MaTaiKhoan]).emit('update notifications number')
          //   io.to(global.doctorId[result.data.MaTaiKhoan]).emit('update list notifications', result.data.notification, result.data.id)
          // }

          var topic = `${info.LoaiNguoiChinh}-${info.MaTaiKhoan}`;

          var message1 = ''
          switch(info.LoaiNguoiLienQuan){
            case 1: {
              if(info.LoaiNguoiChinh===1){
                message1 += 'Người thân '
              }
              else{
                message1 += 'Bệnh nhân '
              }
              break;
            }
            case 2: {
              message1 += 'Bác sĩ '
              break;
            }
          }

          var message2 = ''
          switch(info.LoaiThongBao) {
            case 1: {
              if(info.LoaiNguoiChinh===1){
                message2 += ' muốn theo dõi sức khỏe của bạn'
              }
              else{
                message2 += ' muốn bạn theo dõi sức khỏe của họ'
              }
              break;
            }
            case 2:  {
              message2 += ' gửi tin nhắn mới cho bạn'
              break;
            }
            case 3:  {
              if(info.LoaiNguoiChinh===1){
                message2 += ' chấp nhận lời mời theo dõi của bạn'
              }
              else{
                message2 += ' chấp nhận theo dõi của bạn'
              }
              break;
            }
          }

          var message = {
            notification: {
              title: 'Bạn có thông báo mới',
              body: `${message1}${info.TenNguoiLienQuan}${message2}`
            },
            data: {
              loaiThongBao: info.LoaiThongBao.toString(),
              maTaiKhoanLienQuan: info.MaTaiKhoanLienQuan,
              loaiTaiKhoanLienQuan: info.LoaiNguoiLienQuan.toString(),
              idNoti: result.data.id.toString(),
            },
            topic: topic
          };

          // Send a message to devices subscribed to the provided topic.
          admin.messaging().send(message)
            .then((response) => {
              // Response is a message ID string.
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });

          io.to(`${info.LoaiNguoiChinh}/${info.MaTaiKhoan}`).emit('update notifications number')
          io.to(`${info.LoaiNguoiChinh}/${info.MaTaiKhoan}`).emit('update list notifications', result.data.notification, result.data.id)
        }
      })
  })
  socket.on('get notifications number', function (info) {
    axios.get(`http://localhost:5500/notifications/numberNotificationsNotSeen?MaTaiKhoan=${info.MaTaiKhoan}&LoaiTaiKhoan=${info.LoaiTaiKhoan}`)
      .then((result) => {
        // if (global.patientId[result.data.MaTaiKhoan] && result.data.LoaiTaiKhoan===1) {
        //   console.log(global.patientId[result.data.number.MaTaiKhoan])
        //   if (result.data.status === 'success')
        //     io.to(global.patientId[result.data.number.MaTaiKhoan]).emit('get notifications number', result.data.number.SoLuong)
        //   else
        //     io.to(global.patientId[result.data.number.MaTaiKhoan]).emit('get notifications number', 0)
        // }
        // else if (global.doctorId[result.data.MaTaiKhoan] && result.data.LoaiTaiKhoan===2) {
        //   if (result.data.status === 'success')
        //     io.to(global.doctorId[result.data.number.MaTaiKhoan]).emit('get notifications number', result.data.number.SoLuong)
        //   else
        //     io.to(global.doctorId[result.data.number.MaTaiKhoan]).emit('get notifications number', 0)
        // }
        // console.log(result)
        if (result.data.status === 'success')
          io.to(`${info.LoaiTaiKhoan}/${info.MaTaiKhoan}`).emit('get notifications number', result.data.number.SoLuong)
        else
          io.to(`${info.LoaiTaiKhoan}/${info.MaTaiKhoan}`).emit('get notifications number', 0)

      })
  })
  socket.on('seen notifications', function (info) {
    axios.post('http://localhost:5500/notifications/seenNotifications', {MaTaiKhoan: info.MaTaiKhoan, LoaiTaiKhoan: info.LoaiTaiKhoan})
      .then((result) => {
        if (result.data.status==='success')
        //   if (global.patientId[result.data.MaTaiKhoan] && result.data.LoaiTaiKhoan===1) {
        //     io.to(global.patientId[info.MaTaiKhoan]).emit('update notifications number')
        //   }
        // else if (global.doctorId[result.data.MaTaiKhoan] && result.data.LoaiTaiKhoan===2) {
        //     io.to(global.doctorId[info.MaTaiKhoan]).emit('update notifications number')
        //   }
          io.to(`${info.LoaiTaiKhoan}/${info.MaTaiKhoan}`).emit('update notifications number')
      })
  })
})

// const server_port = process.env.PORT || 5500;

// const server = app.listen(server_port, function () {
//   console.log(`App listening at port ${server_port}`)
// });

http.listen(5500, function () {
  console.log('App listening at port :5500');
});

module.exports = app;
