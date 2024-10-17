import { Avatar, Box, Typography } from '@mui/material';

const CarouselPhotoCard = ({ item, IsPath, onImageClick, largeImage = false, currentIndex = 0, totalImages = 0 }) => {

    const handleClick = () => {
        if (onImageClick) {
            onImageClick(IsPath ? item.AlbumID : item.AlbumID);
        }
    };

    // Dynamic avatar size based on `largeImage` prop
    const avatarSize = largeImage ? { height: '450px', width: '440px' } : { height: '220px', width: '260px' };

    return (
        <>
            <Box sx={{ p: 0 }}>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                         padding: '4px 8px ',
                    }}
                    variant="h4"
                    textAlign="center"
                >
                    {item.Header}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar
                        alt="Image"
                        src={
                            IsPath ? item.Text2 :
                                item.Text2 !== 0
                                    ? `data:image/png;base64,${item.Text2}`
                                    : '/imges/defaultUser.jpg'
                        }
                        sx={{
                            ml:1,
                            mt: '10px',
                            backgroundColor: '#90caf9',
                            width: avatarSize.width,
                            height: avatarSize.height,
                            border: (theme) => `1px solid ${theme.palette.grey[600]}`,
                        }}
                        variant="rounded"
                        onClick={handleClick}
                    />
                </Box>

                <Typography variant="body2" textAlign="center" sx={{ m: 1 }}>
                    {item.Text1}
                </Typography>

                {largeImage && (
                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                        {`${currentIndex + 1} of ${totalImages}`}
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default CarouselPhotoCard;
