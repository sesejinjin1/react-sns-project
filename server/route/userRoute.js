const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const JWT_KEY = "secret_key";
const ROUND = 10;

router.route("/")
    .get((req,res)=>{
        const query = 'SELECT * FROM TBL_USER';
        connection.query(()=>{
            if(err){
                console.error('쿼리 실행실패:' , err);
                return;
            }
            res.render('user',{list : results});
        });
    })
    .post((req,res)=>{
        const {email, password} = req.body;
        const query = 'SELECT * FROM TBL_USER WHERE id = ?';

        connection.query(query,[email], async (err, results) =>{
            if (err) throw err;
            if(results.length>0){
                const user = results[0];
                const dbPwd = user.pwd;
                const result = await bcrypt.compare(password, dbPwd);
                // console.log("user>>",user);
                // console.log("resul>>",result);
                // console.log("입력pwd>>",password);
                // console.log("dbPwd>>",dbPwd);
                // 다 구현하면 아래 조건엔 result만 넣기 임시데이터가 해시로 안들어가있어서 넣어둠.
                if(result || password == dbPwd){
                    const token = jwt.sign({userId : user.id, name : user.name}, JWT_KEY, {expiresIn : '1m'});
                    console.log('토큰콘솔',token);
                    const verified = jwt.verify(token, "secret_key");
                    console.log("verified",verified);
                    const decoded = jwt.decode(token, { complete: true });
                    console.log("decode",decoded);
                    res.json({success: true, message : "로그인성공", token});
                }else{
                    res.json({result : false, message : '아디비번확인하세요'});
                }

            }else{
                res.json({success: false, message: '실패!'});
            }
        })


    });

module.exports = router;