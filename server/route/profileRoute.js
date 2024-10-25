const express = require('express');
const router = express.Router();
const connection = require('../db');

router.route("/")
    .get((req,res)=>{
        const {userId} = req.query;
        const query = `SELECT F.ID,F.CONTENT,F.CDATETIME,U.ID AS USERID,U.NAME AS USERNAME FROM TBL_FEED F INNER JOIN TBL_USER U ON F.USERID = U.ID WHERE U.ID = ?`;
        const countQuery = `SELECT COUNT(*) AS FEEDCOUNT FROM TBL_FEED F INNER JOIN TBL_USER U ON F.USERID = U.ID WHERE U.ID = ?`;
        connection.query(query,[userId],(err, results) =>{
            if(err){
                console.error('유저 정보 조회 실패:', err);
                return res.json({success:false, message:'서버 오류 발생(프로필쪽)'});
            }
            connection.query(countQuery,[userId],(err,feecCount) =>{
                if(err){
                    console.error('피드 카운트 조회 실패:', err);
                    return res.json({success:false, message:'서버 오류 (피드카운트)'});
                }
                res.json({
                    success:true,
                    list : results,
                    feedCount : feecCount[0].FEEDCOUNT
                });
            })
            // console.log("results>>",results);
            // console.log("userID>>>",userId);
        });
    });

router.route("/:userId").get((req,res)=>{
    const {userId} = req.params;
    console.log("서버측 넘어옴?",req.params);
    const query = `SELECT F.ID,F.CONTENT,F.CDATETIME,U.ID AS USERID,U.NAME AS USERNAME FROM TBL_FEED F INNER JOIN TBL_USER U ON F.USERID = U.ID WHERE U.ID = ${userId}`;
    const countQuery = `SELECT COUNT(*) AS FEEDCOUNT FROM TBL_FEED F INNER JOIN TBL_USER U ON F.USERID = U.ID WHERE U.ID = ${userId}`;
    connection.query(query,(err, results)=>{
        if(err){
            console.error('유저 정보 조회 실패:', err);
            return res.json({success:false, message:'서버 오류 발생(프로필쪽)'});
        }
        connection.query(countQuery,(err,feecCount) =>{
            if(err){
                console.error('피드 카운트 조회 실패:', err);
                return res.json({success:false, message:'서버 오류 (피드카운트)'});
            }
            res.json({
                success:true,
                list : results,
                feedCount : feecCount[0].FEEDCOUNT
            });
        })
        console.log("urlID넘어오나>>",results);
        console.log("urlID넘어오나>>>",userId);
    });

});

module.exports = router;