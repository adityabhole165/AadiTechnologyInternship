import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button } from '@mui/material';
import { useState } from 'react';

function ButtonSort({ sortClick, isascending }) {
  const [ascending, setAscending] = useState('asc');

  return (
    <div>
      <Button
        variant="contained"
        endIcon={
          isascending === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
        }
        onChange={() => sortClick('des')}
      >
        BookTitle
      </Button>
    </div>
  );
}

export default ButtonSort;
