import { Request, Response, NextFunction } from "express";

import { User } from "../utils/constants";

import pool from "../db";

const createUser = (req: User, res: Response, next: NextFunction) => {
  const name = req.name;
  try {
    pool.query(
      "INSERT INTO users(name) VALUES($1) RETURNING *",
      [name],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).json({ user: results.rows[0] });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "データベースへの挿入中にエラーが発生しました。" });
  }
};

// User APIの基本情報を返す関数
const getUsers = (req: User, res: Response, next: NextFunction) => {
  try {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "データベースのクエリ中にエラーが発生しました。" });
      }
      res.json({ users: results.rows });
    });
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

// 特定のユーザー情報を返す関数
const getUserById = (req: User, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.json({ user: results.rows[0] });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

const putUser = (req: User, res: Response, next: NextFunction) => {
  try {
    const name = req.name;
    const userId = req.id;
    pool.query(
      "UPDATE users SET name = $1 WHERE id = $2",
      [name, userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.json({ message: "ユーザー更新成功" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

const deleteUser = (req: User, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    pool.query(
      "DELETE FROM users WHERE id = $1",
      [userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.json({ message: "ユーザー削除成功" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "内部サーバーエラー" });
  }
};

export { createUser, getUsers, getUserById, putUser, deleteUser };
