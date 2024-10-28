import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

function Register() {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');

  const imageChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const fnSubMit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:3100/feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setFiles([]);
    } catch (error) {
      console.error('피드 등록 오류:', error);
    }
  };
  
  return (
    <Container sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <form onSubmit={fnSubMit}>         
          <TextField
            label="내용"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)} 
            sx={{ width: '600px' }}
          />

          <Box display="flex" alignItems="center" margin="normal" fullWidth>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              multiple
              onChange={imageChange}
            />
            <label htmlFor="file-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {files.length > 0 && (
              <Box sx={{ display: 'flex', marginLeft: 2 }}>
                {files.map((file, index) => (
                  <Avatar
                    key={index}
                    alt="첨부된 이미지"
                    src={URL.createObjectURL(file)}
                    sx={{ width: 100, height: 100, marginLeft: 1 }} // 크기 설정
                    variant="rounded" // 모서리 둥글게
                  />
                ))}
              </Box>
            )}
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {files.length > 0 ? `${files.length}개의 파일 선택됨` : '첨부할 파일 선택'}
            </Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} type="submit">
            등록하기
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
