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

 Date: 20/05/2019 15:37:38
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
  `Avatar` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `BenhVien` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NULL DEFAULT NULL,
  `IsDeleted` bit(1) NULL DEFAULT b'0',
  PRIMARY KEY (`MaBacSi`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bac_si
-- ----------------------------
INSERT INTO `bac_si` VALUES ('0941430622', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Nguyễn Gia Huỳnh', NULL, NULL, NULL, NULL, NULL, b'0');
INSERT INTO `bac_si` VALUES ('123456789', '565339bc4d33d72817b583024112eb7f5cdf3e5eef0252d6ec1b9c9a94e12bb3', 'Nguyễn Hoài Nam', NULL, NULL, NULL, NULL, NULL, b'0');

-- ----------------------------
-- Table structure for benh_nhan
-- ----------------------------
DROP TABLE IF EXISTS `benh_nhan`;
CREATE TABLE `benh_nhan`  (
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Avatar` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NgaySinh` date NULL DEFAULT NULL,
  `NgheNghiep` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NhomMau` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `DiUngThuoc` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `IsDeleted` bit(1) NULL DEFAULT b'0',
  PRIMARY KEY (`MaBenhNhan`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of benh_nhan
-- ----------------------------
INSERT INTO `benh_nhan` VALUES ('0939977538', '949aac905d5fe1eba99596e3696ed1f0c1bc00960af0895f9227f5f9c656af91', 'Lưu Khởi Toàn', NULL, NULL, b'1', NULL, NULL, NULL, NULL, NULL, NULL, b'0');
INSERT INTO `benh_nhan` VALUES ('0982860738', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Nguyễn Gia Huỳnh', NULL, NULL, b'1', NULL, NULL, NULL, NULL, NULL, NULL, b'0');

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `MaDoanChat` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaNguoiGui` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `LoaiNguoiGui` tinyint(255) NULL DEFAULT NULL,
  `MaNguoiNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `LoaiNguoiNhan` tinyint(255) NULL DEFAULT NULL,
  `NoiDung` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NgayGioGui` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaDoanChat`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (1, '0941430622', 1, '0982861197', 2, 'OK đã gửi được', '2019-06-30 14:35:41');
INSERT INTO `chat` VALUES (2, '0941430622', 1, '0982861197', 2, 'OKKK', '2019-04-09 11:48:38');
INSERT INTO `chat` VALUES (3, '0982861197', 2, '0941430622', 1, 'Replied', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (4, '123456789', 1, '0982860738', 1, 'Test Socket', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (5, '123456789', 1, '0982860738', 1, 'hello', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (6, '123456789', 1, '0982860738', 1, 'Socket chạy được rồi nè', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (7, '123456789', 1, '0982860738', 1, 'OK luôn nha', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (8, '123456789', 2, '0982860738', 2, 'hi hi', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (9, '123456789', 2, '0982860738', 2, 'Huỳnh', '2019-05-01 07:51:32');
INSERT INTO `chat` VALUES (10, '0941430622', 2, '0982861197', 2, 'BN chat với nhau', '2019-05-20 15:10:03');
INSERT INTO `chat` VALUES (11, '0982861197', 2, '0941430622', 2, 'BN chat', '2019-05-21 15:10:50');

-- ----------------------------
-- Table structure for chi_so
-- ----------------------------
DROP TABLE IF EXISTS `chi_so`;
CREATE TABLE `chi_so`  (
  `MaKetQua` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Loai` double(255, 1) NULL DEFAULT NULL,
  `ChiSo` double(255, 2) NULL DEFAULT NULL,
  `NgayNhap` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaKetQua`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chi_so
-- ----------------------------
INSERT INTO `chi_so` VALUES (3, '0941430622', 2.1, 23.50, '2019-06-20 14:35:41');
INSERT INTO `chi_so` VALUES (4, '0941430622', 2.1, 50.00, '2019-06-20 14:40:41');
INSERT INTO `chi_so` VALUES (5, '0941430622', 2.1, 90.00, '2019-06-15 14:40:41');
INSERT INTO `chi_so` VALUES (6, '0941430622', 2.1, 180.00, '2019-06-10 14:40:41');
INSERT INTO `chi_so` VALUES (7, '0941430622', 2.1, 70.00, '2019-06-15 17:13:52');
INSERT INTO `chi_so` VALUES (8, '0941430622', 2.1, 10.00, '2019-05-20 10:49:21');
INSERT INTO `chi_so` VALUES (9, '0941430622', 2.1, 30.00, '2019-05-22 10:56:50');
INSERT INTO `chi_so` VALUES (10, '0941430622', 2.1, 55.00, '2019-05-24 11:09:22');
INSERT INTO `chi_so` VALUES (11, '0941430622', 2.1, 60.00, '2019-05-28 11:09:43');
INSERT INTO `chi_so` VALUES (12, '0941430622', 2.1, 80.00, '2019-05-31 11:10:23');
INSERT INTO `chi_so` VALUES (14, '0941430622', 2.2, 10.00, '2019-06-20 14:35:41');
INSERT INTO `chi_so` VALUES (15, '0941430622', 2.2, 20.00, '2019-06-20 14:40:41');
INSERT INTO `chi_so` VALUES (16, '0941430622', 2.2, 30.00, '2019-06-15 14:40:41');
INSERT INTO `chi_so` VALUES (17, '0941430622', 2.2, 40.00, '2019-06-10 14:40:41');
INSERT INTO `chi_so` VALUES (18, '0941430622', 2.2, 50.00, '2019-06-15 17:13:52');
INSERT INTO `chi_so` VALUES (19, '0941430622', 2.2, 60.00, '2019-05-20 10:49:21');
INSERT INTO `chi_so` VALUES (20, '0941430622', 2.2, 70.00, '2019-05-22 10:56:50');
INSERT INTO `chi_so` VALUES (21, '0941430622', 2.2, 80.00, '2019-05-24 11:09:22');
INSERT INTO `chi_so` VALUES (22, '0941430622', 2.2, 90.00, '2019-05-28 11:09:43');
INSERT INTO `chi_so` VALUES (23, '0941430622', 2.2, 100.00, '2019-05-31 11:10:23');
INSERT INTO `chi_so` VALUES (24, '0941430622', 1.0, 50.00, '2019-05-20 14:21:36');

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
INSERT INTO `sessions` VALUES ('_-RI_2V2mYy3i2jNDDiBHvpPmf0_Yz9T', 1559895938, '{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2019-06-07T02:24:14.136Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"IsDoctorLogged\":true,\"Doctor\":{\"MaBacSi\":\"123456789\",\"Password\":\"565339bc4d33d72817b583024112eb7f5cdf3e5eef0252d6ec1b9c9a94e12bb3\",\"HoTen\":\"Nguyễn Hoài Nam\"},\"IsPatientLogged\":true,\"Patient\":{\"MaBenhNhan\":\"0941430622\",\"Password\":\"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08\",\"HoTen\":\"Nguyễn Gia Huỳnh\"}}');
INSERT INTO `sessions` VALUES ('dLQ1qbTaYZdiUNU-7tfbSDScVu4OxmzE', 1560933371, '{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2019-06-15T03:47:14.132Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"IsPatientLogged\":true,\"Patient\":{\"MaBenhNhan\":\"0939977538\",\"Password\":\"329f44354267705eeefe8321bb5bff5caabe25e34654855cce1306fca2262868\",\"HoTen\":\"Lưu Khởi Toàn\"}}');

-- ----------------------------
-- Table structure for theo_doi
-- ----------------------------
DROP TABLE IF EXISTS `theo_doi`;
CREATE TABLE `theo_doi`  (
  `Id` bigint(255) NOT NULL AUTO_INCREMENT,
  `NguoiTheoDoi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NguoiBiTheoDoi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Loai` tinyint(1) NULL DEFAULT NULL,
  `IsRequest` tinyint(1) NULL DEFAULT NULL,
  `IsFollow` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `theo_doi_ibfk_2`(`NguoiTheoDoi`) USING BTREE,
  INDEX `NguoiBiTheoDoi`(`NguoiBiTheoDoi`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of theo_doi
-- ----------------------------
INSERT INTO `theo_doi` VALUES (1, '0941430622', '0939977538', 2, 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
