import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { ListStyle } from '../styled/CardStyle';

function Filter({ clickSearch, clickAllUser }) {
  const [showFilter, setShowFilter] = useState(true);

  const [bookTitle, setBookTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [checked, setChecked] = useState(false);
  const onClick = () => {
    clickSearch({ bookTitle, userName, AllUser: checked });
  };
  const onChange = (value) => {
    setChecked(value);
    clickAllUser(value);
  };
  const onReset = () => {
    setUserName('');
    setBookTitle('');
  };
  return (
    <div>
      <ListStyle>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Book Title :"
              variant="standard"
              fullWidth
              value={bookTitle}
              onChange={(e) => {
                setBookTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="User Name :"
              variant="standard"
              fullWidth
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <ButtonPrimary color="secondary" onClick={onReset}>
              Reset
            </ButtonPrimary>
          </Grid>
          <Grid item xs={1}>
            <ArrowCircleRightRoundedIcon
              onClick={onClick}
              fontSize="large"
              color="success"
              sx={{ float: 'right' }}
            ></ArrowCircleRightRoundedIcon>
          </Grid>
          <Grid item xs={12} sx={{ mt: '-10px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    onChange(!checked);
                  }}
                />
              }
              label="Show all claimed books by all users"
            />
          </Grid>
        </Grid>
      </ListStyle>
    </div>
  );
}

export default Filter;
