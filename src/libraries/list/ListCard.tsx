import { Avatar, Box, Grid } from '@mui/material';
// import FileSelectall from 'src/components/OnlineExam/FileSelectall';

const ListCard = ({ itemList, clickItem, selectedItem }) => {
  return (
    <div>
      <Grid container>
        {itemList?.map((item, index) => (
          <>
            <Box sx={{ ml: '2px' }}>
              {selectedItem == item.Name ? (
                <Avatar
                  sx={{
                    bgcolor:
                      selectedItem == item.Name
                        ? item.IsAnswered
                          ? 'green'
                          : 'blue'
                        : '',
                    width: 29,
                    height: 29,
                    fontSize: '10px',
                    mt: '5px'
                  }}
                  onClick={() => {
                    clickItem(item.Name);
                  }}
                >
                  {item.SerialNo}
                </Avatar>
              ) : item.IsAnswered ? (
                <Avatar
                  sx={{
                    bgcolor: item.IsAnswered ? 'green' : 'white',
                    border: '3px solid grey',
                    borderRadius: '20px',
                    width: 29,
                    height: 29,
                    fontSize: '10px',
                    mt: '5px'
                  }}
                  onClick={() => {
                    clickItem(item.Name);
                  }}
                >
                  {item.SerialNo}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    border: '3px solid grey',
                    borderRadius: '20px',
                    width: 29,
                    height: 29,
                    fontSize: '10px',
                    mt: '5px'
                  }}
                  onClick={() => {
                    clickItem(item.Name);
                  }}
                >
                  {item.SerialNo}
                </Avatar>
              )}
            </Box>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default ListCard;
