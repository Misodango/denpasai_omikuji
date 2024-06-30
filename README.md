# denpasai_omikuji

## 概要

抵抗を引いてもらったら，ESP32で`analogRead`して，くじを引くことができます．

![preview](img/preview.png)

## 使い方

`server/server.js`をwindows上の任意の場所において`node server.js`で実行しておく．
`main.cpp`をESP32に書き込んでCOM6で起動．
`npm run dev`
