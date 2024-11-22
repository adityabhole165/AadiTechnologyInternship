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
import { useEffect, useState } from 'react';

// Animation Keyframes
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateX(-50%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const zoomIn = keyframes`
    from {
        transform: scale(0.8);
        opacity: 0.8;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

// Styled Components with Animations
const AnimatedImage = styled('img')({
    width: '100%',
    height: 'auto',
    transition: 'opacity 0.5s ease-in-out',
    animation: `${fadeIn} 1s ease-in-out`,
});

const AnimatedCard = styled(Card)(({ theme }) => ({
    animation: `${slideIn} 1s ease-out`,
    backgroundColor: theme.palette.grey[100],
    boxShadow: theme.shadows[3],
}));

const GalleryContainer = styled(Box)({
    maxWidth: 600,
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

const SlideshowPhotoGallery = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [speed, setSpeed] = useState('medium');
    const [isPlaying, setIsPlaying] = useState(true);

    const images = [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
        '/path/to/image4.jpg',
        '/path/to/image5.jpg',
    ];

    const speedValues = {
        slow: 5000,
        medium: 3000,
        fast: 1000,
    };

    useEffect(() => {
        let intervalId;
        if (isPlaying) {
            intervalId = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
            }, speedValues[speed]);
        }
        return () => clearInterval(intervalId);
    }, [speed, isPlaying, images.length]);

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    const handleImageClick = (index) => {
        setCurrentImage(index);
    };

    return (
        <GalleryContainer>
            <Typography variant="h5" align="center" gutterBottom>
                Gallery Name: JanmashtamiiAug24
            </Typography>

            {/* Animated Card */}
            <AnimatedCard>
                <CardContent>
                    {/* Animated Image */}
                    <AnimatedImage
                        key={currentImage} // Add key to trigger animation on image change
                        src={images[currentImage]}
                        alt={`Slide ${currentImage + 1}`}
                        style={{ animation: `${zoomIn} 0.7s ease-out` }}
                    />
                </CardContent>
            </AnimatedCard>

            {/* Comment Section */}
            <Box sx={{ mt: 1 }}>
                <CardContent>Comment</CardContent>
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                {images.map((_, index) => (
                    <NavigationButton
                        key={index}
                        onClick={() => handleImageClick(index)}
                        sx={{
                            backgroundColor: currentImage === index ? '#9e9e9e' : '#e0e0e0',
                        }}
                    >
                        {index + 1}
                    </NavigationButton>
                ))}
            </Box>

            {/* Speed Controls */}
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
