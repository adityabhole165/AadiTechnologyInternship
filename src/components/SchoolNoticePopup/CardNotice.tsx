import AttachmentIcon from '@mui/icons-material/Attachment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
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
        navigate('../' + path.replace('/Common/', ''), { state: { fromInternal: true } })

    }
    return (
        <>
            <Grid item container xs={12} >
                <Grid item xs={11}>

                    {/* <Card sx={{ display: 'flex', alignItems: 'center', p: 0.5, mt: 0.7 }}> */}
                    <ListStyle color={item.IsImageNotice ? 'secondary' : 'primary'}
                        sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{
                            textDecoration: item.isActive ? "line-through" : "",
                            fontWeight: item.isActive ? 'bold' : 'normal',
                        }}
                            onClick={() => { downloadNotice(item.FileName, item.IsText, item.Content) }}
                        >{item.header}</Typography>
                        <div style={{ flex: '1' }}></div>
                        {item.FileName != "" ?
                            <AttachmentIcon onClick={() => { downloadNotice(item.FileName, item.IsText, item.Content) }} /> :
                            <span style={{ marginRight: "10px" }}>-</span>
                        }
                    </ListStyle>
                    {/* </Card> */}
                </Grid>
                {!item.IsImageNotice &&
                    <Grid item xs={0.7} sx={{ ml: "5px" }}
                    >

                        <IconButton
                            sx={{
                                color: '#223354', mb: "13px",
                                '&:hover': {
                                    color: 'red',
                                    backgroundColor: red[100], mb: '10px'
                                }
                            }}

                            onClick={() => clickDelete(item.id)}
                        >
                            <DeleteForeverIcon />

                        </IconButton>
                    </Grid>
                }
            </Grid>
        </>
    );
};

export default CardNotice;
