import { Box, Typography } from '@mui/material';
import { useState } from 'react';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
interface Mode {
  id: String;
  name: String;
}
const Model = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={style}>
      {data ? (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {user.Text1} */}
            {data.Text1}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {user.Text1} */}
            {data.Text2}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box>{/* <BarChart Isgrade={true}/> */}</Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Model;
