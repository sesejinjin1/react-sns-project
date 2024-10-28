const express = require('express');
const router = express.Router();
const connection = require('../db');
const multer = require('multer')
const path = require('path');

router.route("/")
    .get((req,res)=>{
        const query = `SELECT F.*, COALESCE(I.IMG_PATH, '') AS IMG_PATH FROM TBL_FEED F LEFT JOIN TBL_FEED_IMG I ON F.ID = I.FEED_ID ORDER BY F.cdatetime DESC`;
        connection.query(query, (err, results) =>{
            if(err){
                console.error('피드 조회 실패:', err);
                return res.json({success:false, message: '서버 오류가 발생했습니다.'});
            }
            res.json({success: true, list : results});
        });
    })

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          console.log(file);
          cb(null, 'img/'); // 서버 내 img 폴더
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname); // 파일 확장자
          cb(null, Date.now() + ext); // 고유한 파일 이름으로 저장
        },
      });
    const upload = multer({ storage }); 
    // 피드 등록 및 이미지 업로드
    router.route("/")
      .post(upload.array('images'), (req, res) => {
        const { content } = req.body; // 피드의 내용
    
        // 피드 먼저 등록
        const feedQuery = 'INSERT INTO tbl_feed (userId, content) VALUES (?, ?)';
        const userId = "user1"; // 사용자의 ID, 하드코딩으로 대체
    
        connection.query(feedQuery, [userId, content], (err, feedResult) => {
          if (err) {
            console.error('피드 등록 실패:', err);
            return res.json({ success: false, message: "피드 등록 실패" });
          }
    
          const feed_id = feedResult.insertId; // 등록된 피드의 ID 가져오기
    
          // 이제 이미지를 등록할 차례
          const files = req.files;
          console.log(req);
          console.log(req.files);
          console.log(feedResult);
          console.log(files);
          if (!files || files.length === 0) {
            return res.json({ success: false, message: "파일이 업로드되지 않았습니다." });
          }
    
          // 이미지 경로들을 DB에 저장
          const imgQuery = 'INSERT INTO tbl_feed_img (feed_id, img_path) VALUES ?';
          const imgData = files.map(file => [feed_id, file.path]);
    
          connection.query(imgQuery, [imgData], (err, imgResult) => {
            if (err) {
              console.error('이미지 저장 실패:', err);
              return res.status(500).json({ success: false, message: "이미지 저장 실패" });
            }
    
            res.json({ success: true, message: "피드 및 파일이 성공적으로 저장되었습니다!" });
          });
        });
      });
    
module.exports = router;