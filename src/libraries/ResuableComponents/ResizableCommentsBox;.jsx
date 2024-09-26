// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Card, Typography } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import { useContext } from 'react';
// import ProgressRemarkTerm from 'src/components/ProgressRemarks/ProgressRemarkTerm';
// function ResizableCommentsBox({
//   ItemList,
//   HeaderArray,
//   NoteClick,
//   setTextValues
// }) {
//   const TextChange = (value) => {
//     const filteredValue = value.Value.replace(/[^a-zA-Z\s]/g, '');
//     if (filteredValue.length <= 300) {
//       ItemList = ItemList.map((item) =>{
//         return { ...item,
//           Remarks: item.Remarks.map((RemarksItem, i)=>{
//           return { ...RemarksItem,
//             Text3: ( value.Id === item.Id && value.Index == i) ? filteredValue   : RemarksItem.Text3
//         }
//       })
//       }
//       });
//       setTextValues(ItemList);
//     }
//   };
//   let TermId = useContext(ProgressRemarkTerm)


//   return (
//     <div
//       style={{
//         maxHeight: '800px',
//         overflowY: 'auto',
//         scrollBehavior: 'smooth',
//         border: '2px'
//       }}
//     >
//       <TableContainer component={Card}>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               {HeaderArray.map((item, i) => (
//                 <TableCell
//                   key={i}
//                   sx={{
//                     textTransform: 'capitalize',
//                     backgroundColor: (theme) => theme.palette.secondary.main,
//                     color: 'white'
//                   }}
//                   align="center"
//                 >
//                   <b>{item.Header}</b>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ItemList.map((item, i) => (
//               <TableRow
//                 key={i}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell align="center" sx={{ color:  item.IsLeftStudent == 1  ? 'red' : 'inherit' }}>{item.Text1}</TableCell>
//                 <TableCell   align="center"  sx={{ color:  item.IsLeftStudent == 1  ? 'red' : 'inherit' }} >{item.Text2}</TableCell>

//                 {TermId == 2 && (
//                   <TableCell align="center" >
//                     <TextareaAutosize value={item.Text4} />
//                   </TableCell>
//                 )}

//                 {item.Remarks.map((RemarksItem,i)=>{
//                   return (<TableCell align="center" key={i}>

//                     <TextareaAutosize 
//                       id={`outlined-basic-${i}`}
//                       value={RemarksItem.Text3}
//                       variant="outlined"
//                       onChange={(e) => {
//                         TextChange({ Id: item.Id,Index:i, Value: e.target.value });
//                       }}
//                       maxLength={300}
//                       style={{ width: '200px' }}
//                     />

//                     <IconButton onClick={() => NoteClick(item.Id , i )}>
//                       <MoreVertIcon />
//                     </IconButton>
//                     <Typography variant="caption" color="textSecondary">
//                       ({300 - item.Text3.length})
//                     </Typography>

//                 </TableCell>)
//                 })}
//              </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default ResizableCommentsBox;



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

  let TermId = useContext(ProgressRemarkTerm);


  const TextChange = (value) => {
    // Remove character filtering
    // const filteredValue = value.Value.replace(/[^a-zA-Z\s]/g, '');
    const filteredValue = value.Value;
    if (filteredValue.length <= TermId.maxRemarkLength) {
      const updatedItemList = ItemList.map((item) => {
        return {
          ...item,
          Remarks: item.Remarks.map((RemarksItem, i) => {
            return {
              ...RemarksItem,
              Text3: (value.Id === item.Id && value.Index === i) ? filteredValue : RemarksItem.Text3
            };
          })
        };
      });
      setTextValues(updatedItemList);
    }
  };



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
          <TableHead >
            <TableRow>
              {HeaderArray.map((item, i) => (
                <TableCell align={item.Header.includes('Name') ? 'left' : 'left'}
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: 'white',
                  }}

                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {ItemList.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}

              >
                <TableCell align="left" sx={{
                  color: item.IsLeftStudent == 1 ? 'red' : 'inherit', py:0.5}}>{item.Text1}</TableCell>
                <TableCell align="left" sx={{
                  color: item.IsLeftStudent == 1 ? 'red' : 'inherit', py:0.5,  minWidth:'300px'}}>{item.Text2}</TableCell>
                {TermId.SelectTerm == 2 && (
                  <TableCell align="left" sx={{py:0.5}} >
                    <TextareaAutosize value={item.Text4}  minRows={2}  />
                  </TableCell>
                )}
                {item.Remarks.map((RemarksItem, j) => (
                  <TableCell align="left " key={j} sx={{ py:0.5, minWidth:'280px'}} >
                    <TextareaAutosize                    
                      id={`outlined-basic-${i}-${j}`}
                      value={RemarksItem.Text3}
                      variant="caption"
                      onChange={(e) => {
                        TextChange({ Id: item.Id, Index: j, Value: e.target.value });
                      }}
                       minRows={2}
                      maxLength={TermId.maxRemarkLength}
                      // sx={{ width: '200px', }}
                    />
                    <IconButton
                      onClick={() => NoteClick(item.Id, j)}
                      variant="caption"
                      sx={{mt:-3, ml:0}}
                      >
                      <MoreVertIcon />
                    </IconButton>

                    <Typography
                    variant="caption"
                    sx={{mt:10}}
                     color="textSecondary" alignItems={'center'} >
                      ({TermId.maxRemarkLength - RemarksItem.Text3.length})
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResizableCommentsBox;
