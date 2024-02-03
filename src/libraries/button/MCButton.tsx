import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import { Badge, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Styles } from 'src/assets/style/student-style';
import { ListStyle } from '../styled/CardStyle';
import { TabListHeight } from '../styled/CommonStyle';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  boxShadow:
    ' 5px 5px 10px rgba(163, 177, 198, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.2)',
  color: theme.palette.text.secondary
}));

const MCButton = ({ ButtonType, clickTab, activeTab, MarkAsRead }) => {
  const pageLink = '/extended-sidebar/MessageCenter/msgCenter/' + ButtonType;
  const classes = Styles();
  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );
  return (
    <>
      <ListStyle
        color={activeTab == ButtonType ? 'secondary' : 'primary'}
        onClick={() => {
          clickTab(ButtonType);
        }}
        sx={TabListHeight}
      >
        {ButtonType === 'Inbox' ? (
          <Badge badgeContent={MarkAsRead} color="error">
            <InboxIcon className={classes.IconSize} />
          </Badge>
        ) : ButtonType === 'Sent' ? (
          <SendIcon className={classes.IconSize} />
        ) : ButtonType === 'Trash' ? (
          <DeleteIcon className={classes.IconSize} />
        ) : ButtonType === 'Draft' ? (
          <DraftsIcon className={classes.IconSize} />
        ) : null}
        <br />
        <b>{ButtonType}</b>
      </ListStyle>
    </>
  );
};

export default MCButton;
