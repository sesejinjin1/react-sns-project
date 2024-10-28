import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Login from './components/Login';
import Join from './components/Join'; // Join으로 변경
import Feed from './components/Feed';
import Register from './components/Register';
import MyPage from './components/MyPage';
import Menu from './components/Menu'; // Menu로 변경


function App() {

  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/join';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!isAuthPage && <Menu />} {/* 로그인과 회원가입 페이지가 아닐 때만 Menu 렌더링 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage/:urlId" element={<MyPage />} /> 
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
