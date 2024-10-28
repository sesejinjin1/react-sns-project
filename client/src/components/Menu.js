import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon, AppBar } from '@mui/material';
import { Home, Add, AccountCircle, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const Menu = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const token = localStorage.getItem("token");
  const dToken = token ? jwtDecode(token) : null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!isMobile}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="피드" />}
          </ListItem>
          {dToken && (
          <ListItem button component={Link} to="/register">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="작성" />}
          </ListItem>
          )}
          {dToken && (
            <ListItem button component={Link} to={`/mypage/${dToken.userId}`}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              {!isMobile && <ListItemText primary="프로필" />}
            </ListItem>
          )}
          {dToken && (
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <Logout/> {/* 로그아웃 아이콘 */}
            </ListItemIcon>
            <ListItemText primary="로그아웃" />
          </ListItem>
          )}
        </List>
      </Drawer>

      {isMobile && (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <List sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <Home sx={{ color: 'black' }} />
                </ListItemIcon>
              </ListItem>
              <ListItem button component={Link} to="/register">
                <ListItemIcon>
                  <Add sx={{ color: 'black' }} />
                </ListItemIcon>
              </ListItem>
              {dToken && ( // dToken이 존재할 때만
                <ListItem button component={Link} to={`/mypage/${dToken.userId}`}>
                  <ListItemIcon>
                    <AccountCircle sx={{ color: 'black' }} />
                  </ListItemIcon>
                </ListItem>
              )}
              
            </List>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Menu;
