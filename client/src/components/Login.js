import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    emailRef.current.focus();
  },[]);
  async function fnLogin(){
    console.log('콘솔');
    
    const email = emailRef.current.value;
    const pwd = pwdRef.current.value
    if(email == null || email ==''){
      setErrorMessage("아이디를 입력해주세요 .");
      return;
    }
    if(pwd == null || pwd ==''){
      setErrorMessage("비밀번호를 입력해주세요 .");
      return;
    }
    try{
      const res = await axios.post("http://localhost:3100/user",
        {
          email : email,
          password : pwd
        });
      if(res.data.success){
        console.log("resdata콘솔",res.data);;
        localStorage.setItem("token",res.data.token);
        navigate("/");
      }else{
        setErrorMessage(res.data.message);
        console.log("resdata콘솔",res.data);
      }
    }catch{
      console.log('오류발생');
    }
  };
  const onEnter = ((e)=>{
    if(e.key === "Enter"){
      fnLogin();
    }
  });
  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField 
          inputRef={emailRef}
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          onKeyDown={onEnter}
        />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          onKeyDown={onEnter}
        />
        {errorMessage && (
          <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
        <Button onClick={fnLogin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          아이디가 없다면 ? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
