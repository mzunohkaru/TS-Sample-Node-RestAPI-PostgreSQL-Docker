## Docker Command
$ docker-compose up --build
$ docker-compose build --no-cache && docker-compose up

## データベース (PostgreSQL) へのアクセス
$ docker-compose exec db psql -U user -d dev -W

## PostgreSQLコマンド
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);
INSERT INTO users (name) VALUES ('山田太郎');