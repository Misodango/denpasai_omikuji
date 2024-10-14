# denpasai_omikuji

## 概要

抵抗を引いてもらったら，ESP32で`analogRead`して，くじを引くことができます．

![preview](img/preview.png)

## 使い方

`server/server.js`をwindows上の任意の場所において`node server.js`で実行しておく．
`main.cpp`をESP32に書き込んでCOM6で起動．
`npm run dev`でESPの方のサーバーと通信できるようにし，
`npm start`でページ描画ようのアプリを起動します．
`localhost:3000`が自動で開くと思うので，あとは抵抗をさすだけです．
