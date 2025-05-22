import * as React from 'react';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Button, Paper } from '@mui/material';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.includes(value));
}

interface TransferListProps {
  leftItems: { id: number; label: string }[];
  rightItems: { id: number; label: string }[];
}

const TransferListComponent: React.FC<TransferListProps> = ({ leftItems, rightItems }) => {
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState(leftItems.map((item) => item.id));
  const [right, setRight] = React.useState(rightItems.map((item) => item.id));

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleButtonClick = (action: 'allRight' | 'checkedRight' | 'checkedLeft' | 'allLeft') => {
    switch (action) {
      case 'allRight':
        setRight(right.concat(left));
        setLeft([]);
        break;
      case 'checkedRight':
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        break;
      case 'checkedLeft':
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        break;
      case 'allLeft':
        setLeft(left.concat(right));
        setRight([]);
        break;
    }
  };

  const renderList = (items: number[], source: { id: number; label: string }[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((id) => {
          const label = source.find((item) => item.id === id)?.label || `Item ${id}`;
          const labelId = `transfer-list-item-${id}-label`;

          return (
            <ListItemButton key={id} role="listitem" onClick={handleToggle(id)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(id)}
                  tabIndex={-1}
                   disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={label} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{renderList(left, leftItems.concat(rightItems))}</Grid>

      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => handleButtonClick('allRight')}
            disabled={left.length === 0}
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => handleButtonClick('checkedRight')}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => handleButtonClick('checkedLeft')}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => handleButtonClick('allLeft')}
            disabled={right.length === 0}
          >
            ≪
          </Button>
        </Grid>
      </Grid>

      <Grid item>{renderList(right, leftItems.concat(rightItems))}</Grid>
    </Grid>
  );
};

export default TransferListComponent;
