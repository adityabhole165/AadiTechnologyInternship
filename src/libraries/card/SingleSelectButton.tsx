import { Avatar, IconButton, Typography } from '@mui/material';
import { TabStyle } from '../styled/CardStyle';
const SingleSelectButton = ({ item, clickItem }) => {
  const onClick = () => {
    item = {
      ...item,
      IsActive: item.IsActive ? item.IsActive : !item.IsActive
    };
    clickItem(item);
  };
  return (
    <div>
      <TabStyle color={item.IsActive ? 'info' : null} onClick={onClick}>
        <IconButton>
          <Avatar src={item.ImgUrl} />
        </IconButton>
        <Typography>{item.Name}</Typography>
      </TabStyle>
    </div>
  );
};
export default SingleSelectButton;
