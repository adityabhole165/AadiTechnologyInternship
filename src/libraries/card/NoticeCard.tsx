import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Card, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const NoticeCard = ({ item, downloadNotice, clickSingle }) => {
    const navigate = useNavigate();
    const [isCardVisible, setIsCardVisible] = useState(true);
    const handleCheckboxChange = () => {
        setIsCardVisible(!isCardVisible);
    };
    const clickDelete = (value) => {
        clickSingle({ name: name, value: value, checked: !item.isActive })
    }
    const clickCard = (path) => {
        navigate('../' + path.replace('/Common/', ''))

    }
    return (
        <>
            <Grid container xs={12} >
                <Grid xs={10.8} >
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 0.5, mt: 0.7 }}>
                        <Typography sx={{ textDecoration: item.isActive ? "line-through" : "" }}
                            onClick={() => { clickCard(item.linkPath) }}
                        >{item.header}</Typography>
                        <div style={{ flex: '1' }}></div>
                        <FileDownloadOutlinedIcon onClick={() => { downloadNotice(item.FileName, item.IsImageNotice) }} />
                    </Card>
                </Grid>
                <Grid xs={1} sx={{ mt: "10px", ml: "5px" }}>
                    <DeleteIcon onClick={() => clickDelete(item.id)}
                        sx={{ color: !item.isActive ? 'red' : 'grey' }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default NoticeCard;
