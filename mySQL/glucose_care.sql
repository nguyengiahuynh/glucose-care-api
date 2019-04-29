/*
 Navicat Premium Data Transfer

 Source Server         : Test
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : glucose_care

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 29/04/2019 12:14:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bac_si
-- ----------------------------
DROP TABLE IF EXISTS `bac_si`;
CREATE TABLE `bac_si`  (
  `MaBacSi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `NgaySinh` date NULL DEFAULT NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `TrinhDoChuyenMon` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaBacSi`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bac_si
-- ----------------------------
INSERT INTO `bac_si` VALUES ('0941430622', '7d980bbde514db41b1a9cbc7be8c6ac32111f32c63f29147fff16cc575d5401c', 'Mai', b'1', '2015-10-28', '12345698', 'Rạch Giá', 'huynh@gmail.com', 'Bác sĩ');
INSERT INTO `bac_si` VALUES ('1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bac_si` VALUES ('2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bac_si` VALUES ('3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bac_si` VALUES ('4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for benh_nhan
-- ----------------------------
DROP TABLE IF EXISTS `benh_nhan`;
CREATE TABLE `benh_nhan`  (
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `NgaySinh` date NULL DEFAULT NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NgheNghiep` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NhomMau` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `DiUngThuoc` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `TinhTrangBenh` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaBenhNhan`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of benh_nhan
-- ----------------------------
INSERT INTO `benh_nhan` VALUES ('0982860738', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `MaDoanChat` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaNguoiGui` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `MaNguoiNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NoiDung` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NgayGioGui` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaDoanChat`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (1, '0941430622', '0982861197', 'OK đã gửi được', '2019-06-30 14:35:41');
INSERT INTO `chat` VALUES (2, '0941430622', '0982861197', 'OKKK', '2019-04-09 11:48:38');

-- ----------------------------
-- Table structure for ket_qua_theo_doi
-- ----------------------------
DROP TABLE IF EXISTS `ket_qua_theo_doi`;
CREATE TABLE `ket_qua_theo_doi`  (
  `MaKetQua` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `ChieuCao` int(255) NULL DEFAULT NULL,
  `CanNang` double(255, 2) NULL DEFAULT NULL,
  `HuyetAp` float(255, 1) NULL DEFAULT NULL,
  `DuongHuyet` float(255, 0) NULL DEFAULT NULL,
  `NgayLap` datetime(0) NULL DEFAULT NULL,
  `NgayHenTaiKham` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaKetQua`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ket_qua_theo_doi
-- ----------------------------
INSERT INTO `ket_qua_theo_doi` VALUES (1, '0941430622', 167, 65.50, 110.5, 100, '2019-06-28 14:35:41', '2019-06-30 14:35:41');
INSERT INTO `ket_qua_theo_doi` VALUES (2, '0982861197', 167, 15.80, 115.5, 100, '2019-06-28 14:35:41', '2019-06-30 14:35:41');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('_-RI_2V2mYy3i2jNDDiBHvpPmf0_Yz9T', 1559106832, '{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2019-05-25T02:21:24.760Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"IsDoctorLogged\":false,\"Doctor\":null}');

SET FOREIGN_KEY_CHECKS = 1;
