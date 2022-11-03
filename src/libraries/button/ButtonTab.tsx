import { Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Styles } from 'src/assets/style/student-style';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListStyle } from '../styled/CardStyle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AlarmIcon from '@mui/icons-material/Alarm';
import {Buttontab} from '../styled/ButtonStyle';


const ButtonTab = ({ ButtonType, clickTab,activeTab }) => {
    const pageLink = "/extended-sidebar/MessageCenter/msgCenter/" + ButtonType
    const classes = Styles();
    const pathname = window.location.pathname;
    const pageName = pathname.replace(
        '/extended-sidebar/MessageCenter/msgCenter/',
        ''
    );
    return (
        <>
        <Buttontab color={activeTab == ButtonType?'secondary':'primary'} onClick={()=>{clickTab(ButtonType)}}>
                {
                    ButtonType === 'Compose' ?  <AddCircleIcon /> :
                        ButtonType === 'Received' ?  <InboxIcon /> :
                            ButtonType === 'Sent' ?   <SendIcon /> :
                            ButtonType === 'Scheduled' ?     <AlarmIcon /> :
                                null
                }
                <br />
                <b>{ButtonType}</b>
                </Buttontab>

        </>)
}

export default ButtonTab