const express = require('express');
const router = express.Router();
const connection = require('../db');

router.route("/")
    .get((req,res)=>{
        const query = `SELECT F.*, COALESCE(I.IMG_PATH, '') AS IMG_PATH FROM TBL_FEED F LEFT JOIN TBL_FEED_IMG I ON F.ID = I.FEED_ID`;
        
        connection.query(query, (err, results) =>{
            if(err){
                console.error('피드 조회 실패:', err);
                return res.json({success:false, message: '서버 오류가 발생했습니다.'});
            }
            res.json({success: true, list : results});
        });
    })

module.exports = router;