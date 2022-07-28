import React from 'react';
import { Button, CardHeader } from '@mui/material';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

function LibraryToggle({ title1, title2, toggleClick }) {
  return (
    <>
      <CardHeader
        action={
          <Button
            endIcon={<ArrowForwardTwoToneIcon fontSize="small" />}
            onClick={() => toggleClick()}
          >
            {title1}
          </Button>
        }
      ></CardHeader>
      <CardHeader
        sx={{ marginLeft: '10px', color: 'black' }}
        title={title2}
      ></CardHeader>
    </>
  );
}

export default LibraryToggle;
