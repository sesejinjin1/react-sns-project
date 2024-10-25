const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // 추가
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// 정적 파일 제공 dirname 은 현재 파일 경로를 알려줌(server1.js의 절대경로 ~~~~\server1.js 이런형식.)
app.use('/img', express.static(path.join(__dirname, 'img'))); // 추가

app.use("/user", require("./route/userRoute"));
app.use("/feed", require("./route/feedRoute"));
app.use("/profile", require("./route/profileRoute"));
app.listen(3100, () => {
    console.log("server start!");
});
