var db = require('../fn/db');
var constants = require('../constants')

exports.loadAllStatistics = (offset, Loai, MaBenhNhan) => {
    var sql = `select * from chi_so where (Loai = ${Loai} and MaBenhNhan = '${MaBenhNhan}') ORDER BY NgayNhap DESC limit ${constants.STATISTICS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.load7LatestDaysOfStatistic = (Loai, MaBenhNhan) => {
    var sql = `
        SELECT
        cs.MaKetQua,
        cs.MaBenhNhan,
        cs.Loai,
        cs.ChiSo,
        cs.NgayNhap
        FROM chi_so cs
        JOIN
        (
            SELECT MAX(NgayNhap) max_time
            FROM chi_so
            WHERE Loai = ${Loai} AND MaBenhNhan = '${MaBenhNhan}'
            GROUP BY Date(NgayNhap)
            ORDER BY NgayNhap DESC
            LIMIT 7
        ) AS t
        ON cs.NgayNhap = t.max_time AND cs.Loai = ${Loai}
        ORDER BY cs.NgayNhap DESC`;
    return db.load(sql);
}

exports.countStatistics = (Loai, MaBenhNhan) => {
    var sql = `select count(*) as total from chi_so where (Loai = ${Loai} and MaBenhNhan = '${MaBenhNhan}')`;
    return db.load(sql);
}

exports.addStatistic = (patient) => {
    // var sql = `insert into chi_so(MaBenhNhan, Loai, ChiSo, NgayNhap) values('${patient.MaBenhNhan}', '${patient.Loai}', '${patient.ChiSo}', '${patient.NgayNhap}')`;
    var sql = `INSERT INTO chi_so (MaBenhNhan, Loai, ChiSo, NgayNhap)
                SELECT * FROM (SELECT '${patient.MaBenhNhan}', ${patient.Loai}, ${patient.ChiSo}, '${patient.NgayNhap}') AS tmp
                WHERE NOT EXISTS (
                    SELECT MaBenhNhan, Loai, ChiSo, NgayNhap FROM chi_so WHERE MaBenhNhan = '${patient.MaBenhNhan}' and Loai = ${patient.Loai} and NgayNhap = '${patient.NgayNhap}'
                    ) LIMIT 1;`
    return db.save(sql);
}

exports.updateStatistic = (patient) => {
    var sql = `update chi_so 
                    set ChiSo = ${patient.ChiSo}
                    WHERE MaBenhNhan = '${patient.MaBenhNhan}' and Loai = ${patient.Loai} and NgayNhap = '${patient.NgayNhap}'`
    return db.save(sql);
} 