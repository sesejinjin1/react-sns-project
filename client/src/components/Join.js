import React, { useRef, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const nameRef = useRef();
  const confirmPwdRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function fnJoin() {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pwd = pwdRef.current.value;
    const confirmPwd = confirmPwdRef.current.value;

    if(name == null || name == ''){
      setErrorMessage("이름을 입력해주세요 .");
      return;
    }
    if(email == null || email == ''){
      setErrorMessage("아이디를 입력해주세요 .");
      return;
    }
    if(pwd == null || pwd == ''){
      setErrorMessage("비밀번호를 입력해주세요 .");
      return;
    } if(confirmPwd == null || confirmPwd == ''){
      setErrorMessage("비밀번호확인을 입력해주세요 .");
      return;
    }

    if (pwd !== confirmPwd) {
      setErrorMessage("비밀번호가 다릅니다.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3100/user/insert", {
        email, 
        pwd,
        name
      });
      
      console.log("res", res);
      if (res.data.success) {
        alert('회원가입 되었습니다.');
        navigate("/login");
      } else {
        setErrorMessage("이미 사용중인 아이디 입니다!!"); 
      }
    } catch (error) {
      console.log("서버 호출 중 오류 발생", error);
      setErrorMessage("서버 오류가 발생했습니다."); 
    }
  }

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
          회원가입
        </Typography>
        <TextField 
          label="name" 
          variant="outlined" 
          margin="normal" 
          fullWidth 
          inputRef={nameRef} 
        />
        <TextField 
          label="id" 
          variant="outlined" 
          margin="normal" 
          fullWidth 
          inputRef={emailRef} 
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          inputRef={pwdRef}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          inputRef={confirmPwdRef}
        />
        {errorMessage && (
          <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: '20px' }} 
          onClick={fnJoin}
        >
          회원가입
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;
