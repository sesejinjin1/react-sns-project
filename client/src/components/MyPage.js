import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper, Button, Grid2, Card, CardMedia } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const {urlId} = useParams();
  const [feeds, setFeeds] = useState([]);
  const image = 'http://localhost:3100/';
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const dToken = jwtDecode(token);
      console.log("myPage토큰", dToken);
      //setUserInfo({ userId: dToken.userId, name: dToken.name });
    } else {
      console.log("로그인 안했음.");
      console.log("토큰값", token);
    }
  }, []);

  useEffect(() => {
    // if (userInfo &&  !userInfo.feedCount) {
    //   fnProfile();
    // }
    fnProfile();
    
  }, [userInfo]);

  async function fnProfile() {
  try {
    const res = await axios.get(`http://localhost:3100/profile/${urlId}`, {
      params: { userId: urlId }
    });
    if (res.data.success) {
      setUserInfo(() => ({
        userName: res.data.userInfo.name,
        userId: res.data.userInfo.id,
        following : res.data.userInfo.following,
        follower : res.data.userInfo.follower,
        feedCount: res.data.feedCount // 여기에서 feedCount 추가
      }));
      // console.log("123",res.data.userInfo.name)
      // console.log("123",res.data.userInfo.id)
      setFeeds(res.data.feedList);
      // console.log(res.data.feedList);
    }
  } catch {
    console.log('오류');
  }
}

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
                  @{userInfo.userId} 이름{userInfo.userName}
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
                  <Typography variant="body1">{userInfo.follower}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Typography variant="h6">팔로잉</Typography>
                  <Typography variant="body1">{userInfo.following}</Typography>
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
              <Grid2 container spacing={3} justifyContent="flex-start">
                {feeds.map((feed)=>(
                  <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={feed.id}>
                    <Card sx={{ width: 307 }}>
                      {/* 피드사진 */}
                      <CardMedia
                        component="img"
                        height="307"
                        image={`${image}${feed.IMG_PATH}`}
                        alt={feed.img}
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