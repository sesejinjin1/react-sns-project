import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid2,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,

} from '@mui/material';
import { blue } from '@mui/material/colors';
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';

const image = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'

// const mockFeeds = [
//   {
//     id: 1,
//     title: '게시물 1',
//     description: '이것은 게시물 1의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//   },
//   {
//     id: 2,
//     title: '게시물 2',
//     description: '이것은 게시물 2의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
//   },
//   // 추가 피드 데이터
// ];

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userInfo , setUserInfo] = useState([]);
  async function fnFeedList(){
    try{
      const res = await axios.get('http://localhost:3100/feed');
      if(res.data.success){
        setFeeds(res.data.list);
        console.log(res.data.list);
      }
    }catch{
      console.log("FeedList쪽에러");
    }
  }
  
  // const fnLoginInfo(){
  //   const token = localStorage.getItem("token");
  //   const dToken = jwtDecode(token);
  //   setUserInfo(()=>{
  //     userInfo = {userId : dToken.userId, name :dToken.name};
  //   });
  // };

useEffect(()=>{
  const token = localStorage.getItem("token");
  const dToken = jwtDecode(token);
  console.log("feed에서디토큰",dToken);
  console.log("feed에서디토큰",dToken.userId);
  fnFeedList();
},[]);

  const handleClickOpen = (feed) => {
    setSelectedFeed(feed);
    setOpen(true);
    setComments([
      { id: 'user1', text: '멋진 사진이에요!' },
      { id: 'user2', text: '이 장소에 가보고 싶네요!' },
      { id: 'user3', text: '아름다운 풍경이네요!' },
    ]); // 샘플 댓글 추가
    setNewComment(''); // 댓글 입력 초기화
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]); // 모달 닫을 때 댓글 초기화
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: 'currentUser', text: newComment }]); // 댓글 작성자 아이디 추가
      setNewComment('');
    }
  };

  const logout = () =>{
    const token = localStorage.getItem("token");
    token = null;
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNS</Typography>
          <Button color="error" onClick={logout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>


      {/* 이부분이 피드에서 바로 보이는 부분 */}
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid2 container spacing={3} justifyContent="center">
          {feeds.map((feed)=>(
            <Grid2 xs={12} sm={6} md={4} key={feed.id}>
              <Card>
                {/* 피드헤더 아아디 / ㅈ작성일; */}
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                      User
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={feed.userId}
                  subheader={feed.cdatetime}
                />
                {/* 피드사진 */}
                <CardMedia
                  component="img"
                  height="350"
                  image={image}
                  alt={feed.userId}
                  onClick={() => handleClickOpen(feed)}
                  style={{ cursor: 'pointer' }}
                />
                {/* 피드 좋아요버튼 등 */}
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
                {/* 피드 좋아요 수 */}
                {feed.favorite>0 &&(
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    좋아요 {feed.favorite}개
                  </Typography>
                </CardContent>
                )}
                {/* 피드내용 */}
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {feed.content}
                  </Typography>
                </CardContent>

              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> {/* 모달 크기 조정 */}
        {/* 모달 제목부분 */}
        <DialogTitle>
          {selectedFeed?.userId}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ display: 'flex' }}>
          {/* 모달 내용부분  */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed?.description}</Typography>
            {/* 원래 선택한 피드에 이미지가 있을경우에만 표시selectedFeed?.image  */}
            {image && (
              <img
                src={image}
                alt={image}
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
            내용내용 부분부분
          </Box>

          <Box sx={{ width: '300px', marginLeft: '20px' }}>
            <Typography variant="h6">댓글</Typography>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{comment.id.charAt(0).toUpperCase()}</Avatar> {/* 아이디의 첫 글자를 아바타로 표시 */}
                  </ListItemAvatar>
                  <ListItemText primary={comment.text} secondary={comment.id} /> {/* 아이디 표시 */}
                </ListItem>
              ))}
            </List>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}           
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginTop: 1 }}
            >
              댓글 추가
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Feed;