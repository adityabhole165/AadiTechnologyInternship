import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ListStyle } from 'src/libraries/styled/CardStyle';
const CardNotice = ({ item, downloadNotice, clickSingle }) => {
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
            <Grid item container xs={12}>
                <Grid item xs={10.8}>

                    {/* <Card sx={{ display: 'flex', alignItems: 'center', p: 0.5, mt: 0.7 }}> */}
                    <ListStyle color={item.IsImageNotice ? 'secondary' : 'primary'}
                        sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ textDecoration: item.isActive ? "line-through" : "" }}
                            onClick={() => { downloadNotice(item.FileName, item.IsImageNotice) }}
                        >{item.header}</Typography>
                        <div style={{ flex: '1' }}></div>
                        {item.FileName != "" ?
                            <FileDownloadOutlinedIcon onClick={() => { downloadNotice(item.FileName, item.IsImageNotice) }} /> :
                            <FileDownloadOutlinedIcon sx={{ color: 'white' }} />

                        }
                    </ListStyle>
                    {/* </Card> */}
                </Grid>
                {!item.IsImageNotice &&
                    <Grid item xs={1} sx={{ mt: "10px", ml: "5px" }}
                    >
                        <DeleteIcon onClick={() => clickDelete(item.id)}
                            sx={{ color: !item.isActive ? 'red' : 'grey' }}
                        />
                    </Grid>
                }
            </Grid>
        </>
    );
};

export default CardNotice;
