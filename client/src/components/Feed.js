import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
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
  Share as ShareIcon,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';


function Feed() {
  const image = 'http://localhost:3100/';
  const [feeds, setFeeds] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("token");
  const dToken = token ? jwtDecode(token) : null;

  async function fnFeedList() {
    try {
      const res = await axios.get('http://localhost:3100/feed');
      if (res.data.success) {
        setFeeds(res.data.list);
        console.log(res.data.list);
      }
    } catch {
      console.log("FeedList쪽에러");
    }
  }

  useEffect(() => {
    if (token) {
      setUserInfo({ userId: dToken.userId, name: dToken.name });
      fnFeedList();
    } else {
      console.log("로그인 안했음.");
    }
  }, []);

  const handleClickOpen = (feed) => {
    setSelectedFeed(feed);
    setOpen(true);
    setComments([ // 초기 댓글을 고유 ID로 설정
      { id: 'user1', text: '멋진 사진이에요!' },
      { id: 'user2', text: '이 장소에 가보고 싶네요!' },
      { id: 'user3', text: '아름다운 풍경이네요!' },
    ]);
    setNewComment('');
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // 새로운 댓글에 대해 고유한 ID 생성
      const newCommentObj = {
        //id: `currentUser_${Date.now()}`, // 현재 시간 기반으로 고유 ID 생성
        id : userInfo.userId,
        text: newComment,
      };
      setComments((prevComments) => [...prevComments, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <Container maxWidth="md">
      {!token && ( // 로그인 안했을 때 메시지
        <Typography variant="h6" align="center" mt={4}>
          로그인 후 피드를 확인하세요.
          <div>
            <Link to="/login">
              <Button color="primary">
                로그인
              </Button>
            </Link>
            <Link to="/join">
              <Button color="primary">
                회원가입
              </Button>
            </Link>
          </div>

        </Typography>
      )}
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        {feeds.map((feed) => (
          <Card key={feed.id} sx={{ marginBottom: 2, maxWidth: 500, width: '100%' }}>
            <CardHeader
              avatar={
                <Link to={`/mypage/${feed.userId}`} style={{ textDecoration: 'none' }}>
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    User
                  </Avatar>
                </Link>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Link to={`/profile/${feed.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {feed.userId}
                </Link>
              }
              subheader={feed.cdatetime}
            />
            <CardMedia
              component="img"
              sx={{
                height: {
                  xs: '350px',  
                  md: '500px'   
                },
                width: {
                  xs: '350px',  
                  md: '500px'   
                },
                objectFit: 'cover', 
                margin: '0 auto'  
              }}
              image={`${image}${feed.IMG_PATH}`}
              alt={feed.userId}
              onClick={() => handleClickOpen(feed)}
              style={{ cursor: 'pointer' }}
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
            {feed.favorite > 0 && (
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  좋아요 {feed.favorite}개
                </Typography>
              </CardContent>
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {feed.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
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
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed?.content}</Typography>
            {selectedFeed?.IMG_PATH && (
              <img
                src={`${image}${selectedFeed.IMG_PATH}`}
                alt={selectedFeed?.userId}
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
            내용내용 부분부분
          </Box>

          <Box sx={{ width: '300px', marginLeft: '20px' }}>
            <Typography variant="h6">댓글</Typography>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={comment.id}> {/* ID를 key로 사용 */}
                  <ListItemAvatar>
                    <Avatar>{comment.id.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={comment.text} secondary={comment.id} />
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
