import { Avatar, Typography } from '@mui/material';

const CarouselPhotoCard = ({ item, IsPath, onImageClick, largeImage = false, currentIndex = 0, totalImages = 0 }) => {

    const handleClick = () => {
        if (onImageClick) {
            onImageClick(IsPath ? item.AlbumID : item.AlbumID);
        }
    };
    const avatarSize = largeImage ? { height: '500px', width: '400px' } : { height: '300px', width: '250px' };

    return (
        <div>
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
                    height: '300px',
                    width: '250px',
                    ...avatarSize
                }}
                variant="rounded"
                aria-label="add"
                onClick={handleClick}
            />
            <Typography variant="h5">{item.Header}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                {item.Text1}
            </Typography>
            {largeImage && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {`${currentIndex + 1} of ${totalImages}`}
                </Typography>
            )}
        </div>
    );
};

export default CarouselPhotoCard;
