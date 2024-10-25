import React, { useEffect, useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    emailRef.current.focus();
  },[]);
  async function fnLogin(){
    console.log('콘솔');
    console.log(emailRef.current.value);
    console.log(pwdRef.current.value);
    try{
      const res = await axios.post("http://localhost:3100/user",
        {
          email : emailRef.current.value,
          password : pwdRef.current.value
        });
      if(res.data.success){
        console.log("resdata콘솔",res.data);;
        localStorage.setItem("token",res.data.token);
        navigate("/");
      }else{
        alert("id비번확인좀");
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
        <Button onClick={fnLogin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          회원아니셈 ? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
