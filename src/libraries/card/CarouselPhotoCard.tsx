import { Avatar, Box, Typography } from '@mui/material';

const CarouselPhotoCard = ({ item, IsPath, onImageClick, largeImage = false, currentIndex = 0, totalImages = 0 }) => {

    const handleClick = () => {
        if (onImageClick) {
            onImageClick(IsPath ? item.AlbumID : item.AlbumID);
        }
    };
    const avatarSize = largeImage ? { height: '450px', width: 'Auto' } : { height: '300px', width: '250px' };

    return (
        <>
        <Box sx={{p:0}}>
            <Typography variant="h3" textAlign={'center'} >{item.Header}</Typography>
            <Box>
            <Avatar
                alt="user.name"
                src={IsPath ? item.Text2 :
                    item.Text2 != 0
                        ? `data:image/png;base64,${item.Text2}`
                        : '/imges/defualtUser.jpg'
                }
                sx={{
                    mt: '10px',
                    backgroundColor: '#90caf9',
                    width: '100%',
                   height: 'auto',
                    border: (theme) => `1px solid ${theme.palette.grey[600]}`,
                    ...avatarSize
                }}
                variant="rounded"
                aria-label="add"
                onClick={handleClick}
            />
            
            <Typography variant="body2" textAlign={'center'} sx={{ m: 1 }}>
                {item.Text1}
            </Typography>
           
            </Box>
            <Box >
            {largeImage && (
                <Typography variant="body2" sx={{ mt: 0}}>
                    {`${currentIndex + 1} of ${totalImages}`}
                </Typography>
            )}
            </Box>
        </Box>
        </>
    );
};

export default CarouselPhotoCard;
