import DeleteIcon from '@mui/icons-material/Delete';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { AttachmentFile } from 'src/interfaces/MessageCenter/MessageCenter';

interface RenderItemOptions {
  item: string;
  handleRemoveListItems: (item: string, item2) => void;
  list2OfItemsInArray: any;
}

function renderItem({
  item,
  handleRemoveListItems,
  list2OfItemsInArray
}: RenderItemOptions) {
  const IndexOfExtension = item.lastIndexOf('.');
  const Extension = item.slice(IndexOfExtension);
  const AttachmentFilePath =
    localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/';

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveListItems(item, list2OfItemsInArray)}
        >
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
      }
    >
      {Extension == '.pdf' ? (
        <PictureAsPdfRoundedIcon
          sx={{ ml: '-20px', mr: '15px', color: 'red' }}
        />
      ) : (
        <FilePresentRoundedIcon
          sx={{ ml: '-20px', mr: '15px', color: 'blue' }}
        />
      )}
      <ListItemText
        primary={item.slice(0, 25)}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          window.open(AttachmentFilePath.concat(item));
        }}
      />
    </ListItem>
  );
}

export default function TransitionGroupExample({
  OriginalListOfItems,
  FinalListOfItems
}) {
  const a = [];
  for (let key in OriginalListOfItems) {
    a.push(OriginalListOfItems[key].FileName);
  }
  const b = [];
  for (let key in OriginalListOfItems) {
    b.push(a[key] + '`' + OriginalListOfItems[key].Base64URL);
  }
  const c = [];
  for (let key in OriginalListOfItems) {
    c.push(OriginalListOfItems[key].Base64URL);
  }

  const [list1OfItemsInArray, setlistOfItemsInArray] = React.useState(a);
  const [list2OfItemsInArray, setlistOfItemsInArrayb] = React.useState(b);
  const [l, setl] = React.useState([...c]);
  const [finalBase642, setFinalBase642] = React.useState<AttachmentFile[]>([]);

  const handleAddFruit = () => {
    const nextHiddenItem = a.find((i) => !list1OfItemsInArray.includes(i));
    const nextHiddenItem2 = c.find((i) => !l.includes(i));

    if (nextHiddenItem) {
      setlistOfItemsInArray((prev) => {
        return [nextHiddenItem, ...prev];
      });
      setl((prev) => {
        return [nextHiddenItem2, ...prev];
      });
    }
  };

  const handleRemoveListItems = (item: string, item2) => {
    l.length = 0;
    for (let key in item2) {
      const slc = item2[key].slice(0, item.length);
      const slc2 = item2[key].slice(item.length);
      if (item === slc) {
        const ind = item2.indexOf(slc + slc2);
        const spl = item2.splice(ind, 1);
        setlistOfItemsInArrayb(item2);
      }
      let ind = item2[key].indexOf('`');
      let spl = item2[key].slice(ind + 1, -1);
      l.push(spl);
    }
    setlistOfItemsInArray((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addListOfItemsButton = (
    <Button
      variant="contained"
      disabled={list1OfItemsInArray.length >= a.length}
      onClick={handleAddFruit}
    >
      Add previous attachments
    </Button>
  );
  FinalListOfItems(list1OfItemsInArray, l);

  return (
    <div>
      {addListOfItemsButton}
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {list1OfItemsInArray.map((item, key) => (
              <Collapse key={item}>
                {renderItem({
                  item,
                  handleRemoveListItems,
                  list2OfItemsInArray
                })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
}
