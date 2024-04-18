"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = (req, res, next) => {
    const name = req.name;
    try {
        db_1.default.query("INSERT INTO users(name) VALUES($1) RETURNING *", [name], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ user: results.rows[0] });
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "データベースへの挿入中にエラーが発生しました。" });
    }
};
exports.createUser = createUser;
// User APIの基本情報を返す関数
const getUsers = (req, res, next) => {
    try {
        db_1.default.query("SELECT * FROM users", (error, results) => {
            if (error) {
                return res
                    .status(500)
                    .json({ message: "データベースのクエリ中にエラーが発生しました。" });
            }
            res.json({ users: results.rows });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.getUsers = getUsers;
// 特定のユーザー情報を返す関数
const getUserById = (req, res, next) => {
    try {
        const userId = req.id;
        db_1.default.query("SELECT * FROM users WHERE id = $1", [userId], (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ user: results.rows[0] });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.getUserById = getUserById;
const putUser = (req, res, next) => {
    try {
        const name = req.name;
        const userId = req.id;
        db_1.default.query("UPDATE users SET name = $1 WHERE id = $2", [name, userId], (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ message: "ユーザー更新成功" });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.putUser = putUser;
const deleteUser = (req, res, next) => {
    try {
        const userId = req.id;
        db_1.default.query("DELETE FROM users WHERE id = $1", [userId], (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ message: "ユーザー削除成功" });
        });
    }
    catch (error) {
        res.status(500).json({ message: "内部サーバーエラー" });
    }
};
exports.deleteUser = deleteUser;
