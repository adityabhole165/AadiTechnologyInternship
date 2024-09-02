import { Avatar, Typography } from '@mui/material';

const CarouselPhotoCard = ({ item, IsPath }) => {
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
                    width: '250px'
                }}
                variant="rounded"
                aria-label="add"
            />
            <Typography variant="h5">{item.Header}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                {item.Text1}
            </Typography>
        </div>
    );
};

export default CarouselPhotoCard;
