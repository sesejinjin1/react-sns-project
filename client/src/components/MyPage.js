import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper, Button, Grid2, Card, CardMedia } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function MyPage() {
  
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const dToken = jwtDecode(token);
      console.log("myPage토큰", dToken);
      setUserInfo({ userId: dToken.userId, name: dToken.name });
    } else {
      console.log("로그인 안했음.");
      console.log("토큰값", token);
    }
  }, []);

  useEffect(() => {
    if (userInfo &&  !userInfo.feedCount) {
      fnProfile();
    }
  }, [userInfo]);

  async function fnProfile(){
    // console.log("profile>>",userInfo.userId);
    try{
      const res = await axios.get("http://localhost:3100/profile",
        {
          params : {
            userId : userInfo.userId 
          }
        });
        if(res.data.success){
          setUserInfo(prevUserInfo =>({
            ...prevUserInfo,
            feedCount : res.data.feedCount
          }));
          console.log(res.data);
        }
    } catch{
      console.log('오류');
    }
  }



  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        {userInfo &&(
          <Box sx={{ width: '100%' }}>

            <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
              {/* 프로필 정보 상단 배치 */}
              <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
                <Avatar
                  alt="프로필 이미지"
                  src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography variant="h5">{userInfo.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  @{userInfo.userId}
                </Typography>
                <div>
                  <Button color="error">
                    팔로우
                  </Button>
                </div>
              </Box>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={4} textAlign="center">
                  <Typography variant="h6">게시물</Typography>
                  <Typography variant="body1">{userInfo.feedCount || 0}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Typography variant="h6">팔로워</Typography>
                  <Typography variant="body1">150</Typography>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Typography variant="h6">팔로잉</Typography>
                  <Typography variant="body1">100</Typography>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">내 소개</Typography>
                <Typography variant="body1">
                  안녕하세요! SNS를 통해 친구들과 소통하고 있습니다. 사진과 일상을 공유하는 것을 좋아해요.
                </Typography>
              </Box>
            </Paper>
            




            {/* 피드 이미지로 사용할 공간 */}
            <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid2 container spacing={3} justifyContent="center">
                {itemData.map((item)=>(
                  <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={item.img}>
                    <Card sx={{ width: 307 }}>
                      {/* 피드사진 */}
                      <CardMedia
                        component="img"
                        height="307"
                        image={item.img}
                        alt={item.img}
                        // onClick={() => handleClickOpen(feed)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Box>

        )}
      </Box>

    </Container>
  );
}

export default MyPage;