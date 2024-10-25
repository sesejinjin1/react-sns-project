import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon, AppBar } from '@mui/material';
import { Home, Add, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const Menu = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

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
        <Typography variant="h6" component="div" sx={{ p: 2 }}>
          SNS 메뉴
        </Typography>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="피드" />}
          </ListItem>
          <ListItem button component={Link} to="/register">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="등록" />}
          </ListItem>
          <ListItem button component={Link} to="/mypage">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="마이페이지" />}
          </ListItem>
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
              <ListItem button component={Link} to="/mypage">
                <ListItemIcon>
                  <AccountCircle sx={{ color: 'black' }} />
                </ListItemIcon>
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Menu;
