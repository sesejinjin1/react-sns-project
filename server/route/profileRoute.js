const express = require('express');
const router = express.Router();
const connection = require('../db');

// router.route("/")
//     .get((req,res)=>{
//         const {userId} = req.query;
//         const query = `SELECT F.ID,F.CONTENT,F.CDATETIME,U.ID AS USERID,U.NAME AS USERNAME FROM TBL_FEED F INNER JOIN TBL_USER U ON F.USERID = U.ID WHERE U.ID = ?`;
//         const countQuery = `SELECT COUNT(*) AS FEEDCOUNT FROM TBL_FEED F INNER JOIN TBL_USER U ON F.USERID = U.ID WHERE U.ID = ?`;
//         connection.query(query,[userId],(err, results) =>{
//             if(err){
//                 console.error('유저 정보 조회 실패:', err);
//                 return res.json({success:false, message:'서버 오류 발생(프로필쪽)'});
//             }
//             connection.query(countQuery,[userId],(err,feecCount) =>{
//                 if(err){
//                     console.error('피드 카운트 조회 실패:', err);
//                     return res.json({success:false, message:'서버 오류 (피드카운트)'});
//                 }
//                 res.json({
//                     success:true,
//                     list : results,
//                     feedCount : feecCount[0].FEEDCOUNT
//                 });
//             })
//             // console.log("results>>",results);
//             // console.log("userID>>>",userId);
//         });
//     });

router.route("/:userId").get((req, res) => {
    const { userId } = req.params;


    const feedQuery = `SELECT F.*, COALESCE(I.IMG_PATH, '') AS IMG_PATH FROM TBL_FEED F LEFT JOIN TBL_FEED_IMG I ON F.ID = I.FEED_ID WHERE USERID = ? ORDER BY F.cdatetime DESC`;

    const countQuery = `SELECT COUNT(*) AS FEEDCOUNT 
                        FROM TBL_FEED F 
                        INNER JOIN TBL_USER U ON F.USERID = U.ID 
                        WHERE U.ID = ?`;

    const userQuery = `SELECT * FROM TBL_USER WHERE ID = ?`;
    // 피드 리스트 조회
    connection.query(feedQuery, [userId], (err, feedList) => {
        if (err) {
            console.error('피드 리스트 조회 실패:', err);
            return res.json({ success: false, message: '서버 오류 발생(프로필쪽)' });
        }
        // 피드 카운트 조회
        connection.query(countQuery, [userId], (err, feedCount) => {
            if (err) {
                console.error('피드 카운트 조회 실패:', err);
                return res.json({ success: false, message: '서버 오류 (피드카운트)' });
            }
            // 유저 정보 조회
            connection.query(userQuery, [userId], (err, userInfo) => {
                if (err) {
                    console.error('유저 정보 조회 실패:', err);
                    return res.json({ success: false, message: '서버 오류 (유저인포)' });
                }
                res.json({
                    success: true,
                    feedList: feedList,
                    userInfo: userInfo[0],
                    feedCount: feedCount[0].FEEDCOUNT
                });
            });
        });
    });
});


module.exports = router;