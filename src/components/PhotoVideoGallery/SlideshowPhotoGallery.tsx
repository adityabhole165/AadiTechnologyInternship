import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animation Keyframes
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Styled Components
const AnimatedImage = styled('img')({
  width: '100%',
  height: '400px', // Fixed height
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
});

const AnimatedCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  boxShadow: theme.shadows[3],
  width: '600px', // Fixed width
  height: '400px', // Fixed height
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}));

const GalleryContainer = styled(Box)({
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
});

const NavigationButton = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  margin: '0 4px',
  backgroundColor: '#e0e0e0',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#bdbdbd',
  },
}));

const SlideshowPhotoGallery: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(0);
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [isPlaying, setIsPlaying] = useState(true);

  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZvPlqrc213DME__ZhOquq7K9TtxV13k9fg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuAKOQEFZMDsJBBEwULSPzr1z1HjLmqy5Ig&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuAKOQEFZMDsJBBEwULSPzr1z1HjLmqy5Ig&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuAKOQEFZMDsJBBEwULSPzr1z1HjLmqy5Ig&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuAKOQEFZMDsJBBEwULSPzr1z1HjLmqy5Ig&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuAKOQEFZMDsJBBEwULSPzr1z1HjLmqy5Ig&s',
  ];

  const speedValues = {
    slow: 5000,
    medium: 3000,
    fast: 1000,
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setPrevImage(currentImage);
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, speedValues[speed]);
    }
    return () => clearInterval(intervalId);
  }, [speed, isPlaying, images.length, currentImage]);

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(event.target.value as 'slow' | 'medium' | 'fast');
  };

  const handleImageClick = (index: number) => {
    setPrevImage(currentImage);
    setCurrentImage(index);
  };

  return (
    <GalleryContainer>
      <Typography variant="h5" align="center" gutterBottom>
        Gallery Name: JanmashtamiiAug24
      </Typography>

      <AnimatedCard>
        <CardContent sx={{ padding: 0, height: '100%' }}>
          <AnimatedImage
            key={`prev-${prevImage}`}
            src={images[prevImage]}
            alt={`Slide ${prevImage + 1}`}
            sx={{
              animation: `${slideOutToLeft} 0.5s forwards`,
            }}
          />
          <AnimatedImage
            key={`current-${currentImage}`}
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            sx={{
              animation: `${slideInFromRight} 0.5s forwards`,
            }}
          />
        </CardContent>
      </AnimatedCard>

      <Box sx={{ mt: 1 }}>
        <CardContent>Comment</CardContent>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {images.map((_, index) => (
          <NavigationButton
            key={index}
            onClick={() => handleImageClick(index)}
            style={{
              backgroundColor: currentImage === index ? '#9e9e9e' : '#e0e0e0',
            }}
          >
            {index + 1}
          </NavigationButton>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <RadioGroup
          row
          value={speed}
          onChange={handleSpeedChange}
          sx={{ justifyContent: 'center' }}
        >
          <FormControlLabel
            value="slow"
            control={<Radio />}
            label="Slow"
          />
          <FormControlLabel
            value="medium"
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            value="fast"
            control={<Radio />}
            label="Fast"
          />
        </RadioGroup>
      </Box>
    </GalleryContainer>
  );
};

export default SlideshowPhotoGallery;

