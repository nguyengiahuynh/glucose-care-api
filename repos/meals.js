var db = require('../fn/db');
var constants = require('../constants')

exports.loadAll = (info, offset) => {
  var sql = `select * from bua_an where MaBenhNhan = '${info.MaBenhNhan}' and isDeleted = 0 ORDER BY Ngay DESC, Buoi ASC limit ${constants.MEALS_PER_PAGE} offset ${offset}`;
  return db.load(sql);
};

exports.countMeals = (info) => {
  var sql = `select count(*) as total from bua_an where MaBenhNhan = '${info.MaBenhNhan}' and isDeleted = 0`
  return db.load(sql);
};

exports.deleteThisMeal = (info) => {
  var sql = `update bua_an set isDeleted = 1 where MaBenhNhan = '${info.MaBenhNhan}' and Id = ${info.Id}`
  return db.load(sql);
};

exports.todayMeal = (info, offset) => {
  var sql = `select * from bua_an where MaBenhNhan = '${info.MaBenhNhan}' and Ngay = '${info.Ngay}' and isDeleted = 0 ORDER BY Ngay DESC, Buoi ASC`;
  return db.load(sql);
};

exports.addThisMeal = (info) => {
  var sql = `insert into bua_an(MaBenhNhan, Buoi, Ngay, MonAn) values('${info.MaBenhNhan}', '${info.Buoi}', '${info.Ngay}', '${info.MonAn}')`;
  return db.load(sql);
};