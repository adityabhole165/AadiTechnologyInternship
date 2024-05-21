import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useContext } from 'react';
import ProgressRemarkTerm from 'src/components/ProgressRemarks/ProgressRemarkTerm';
function ResizableCommentsBox({
  ItemList,
  HeaderArray,
  NoteClick,
  setTextValues
  
  // setTextValues1,
  // setTextValues2
}) {
  const TextChange = (value) => {
    if (value.Value.length <= 300) {
      ItemList = ItemList.map((item) =>
        item.Id === value.Id ? { ...item, Text3: value.Value } : item
      );
      setTextValues(ItemList);
    }
  };
  let TermId = useContext(ProgressRemarkTerm)
    
   
  // const TextChange1 = (value) => {
  //   if (value.Value.length <= 300) {
  //     ItemList = ItemList.map((item) =>
  //       item.Id === value.Id ? { ...item, Text4: value.Value } : item
  //     );
  //     setTextValues1(ItemList);
  //   }
  // };

  // const TextChange2 = (value) => {
  //   if (value.Value.length <= 300) {
  //     ItemList = ItemList.map((item) =>
  //       item.Id === value.Id ? { ...item, Text5: value.Value } : item
  //     );
  //     setTextValues2(ItemList);
  //   }
  // };

  return (
    <div
      style={{
        maxHeight: '800px',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        border: '2px'
      }}
    >
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: 'white'
                  }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ color:  item.IsLeftStudent == 1  ? 'red' : 'inherit' }}>{item.Text1}</TableCell>
                <TableCell   align="center"  sx={{ color:  item.IsLeftStudent == 1  ? 'red' : 'inherit' }} >{item.Text2}</TableCell>

                {TermId == 2 && (
                  <TableCell align="center" >
                    <TextareaAutosize value={item.Text4} />
                  </TableCell>
                )}
                <TableCell align="center">
                  
                    <TextareaAutosize 
                      id={`outlined-basic-${i}`}
                      value={item.Text3}
                      variant="outlined"
                      onChange={(e) => {
                        TextChange({ Id: item.Id, Value: e.target.value });
                      }}
                      maxLength={300}
                      style={{ width: '200px' }}
                    />

                    <IconButton onClick={() => NoteClick(item.Id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color="textSecondary">
                      ({300 - item.Text3.length})
                    </Typography>
                  
                </TableCell>

                {/* <TableCell align="center">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize
                      id={`outlined-basic-${i}`}
                      value={item.Text4}
                      variant="outlined"
                      onChange={(e) => {
                        TextChange1({ Id: item.Id, Value: e.target.value });
                      }}
                      maxLength={300}
                      style={{ width: '200px' }}
                    />

                    <IconButton onClick={() => NoteClick(i)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color="textSecondary">
                      ({300 - item.Text4.length})
                    </Typography>
                  </div>
                </TableCell> */}

                {/* <TableCell align="center">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize
                      id={`outlined-basic-${i}`}
                      value={item.Text5}
                      variant="outlined"
                      onChange={(e) => {
                        TextChange2({ Id: item.Id, Value: e.target.value });
                      }}
                      maxLength={300}
                      style={{ width: '200px' }}
                    />

                    <IconButton onClick={() => NoteClick(i)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color="textSecondary">
                      ({300 - item.Text5.length})
                    </Typography>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResizableCommentsBox;
