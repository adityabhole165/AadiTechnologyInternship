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
}) {
  const TextChange = (value) => {
    if (value.Value.length <= 300) {
      ItemList = ItemList.map((item) =>{
        return { ...item,
          Remarks: item.Remarks.map((RemarksItem, i)=>{
          return { ...RemarksItem,
            Text3: ( value.Id === item.Id && value.Index == i) ? value.Value  : RemarksItem.Text3
        }
      })
      }
      });
      setTextValues(ItemList);
    }
  };
  let TermId = useContext(ProgressRemarkTerm)
    
  
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
                
                {item.Remarks.map((RemarksItem,i)=>{
                  return (<TableCell align="center">
                  
                    <TextareaAutosize 
                      id={`outlined-basic-${i}`}
                      value={RemarksItem.Text3}
                      variant="outlined"
                      onChange={(e) => {
                        TextChange({ Id: item.Id,Index:i, Value: e.target.value });
                      }}
                      maxLength={300}
                      style={{ width: '200px' }}
                    />

                    <IconButton onClick={() => NoteClick(item.Id , i )}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color="textSecondary">
                      ({300 - item.Text3.length})
                    </Typography>
                  
                </TableCell>)
                })}
             </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResizableCommentsBox;
