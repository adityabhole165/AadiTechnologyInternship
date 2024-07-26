// import ClearIcon from '@mui/icons-material/Clear';
// import { Box } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';

// function TableUsingArray({ ItemList, HeaderArray }) {
//   console.log('ItemList', ItemList);

//   return (
//     <Box sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer component={Paper} square>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead
//             sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
//           >
//             <TableRow>
//               {HeaderArray.map((item, i) => (
//                 i == 0 ? (
//                   <TableCell key={i} align="center"
//                     sx={{ color: 'white', py: 1 }}
//                   >
//                     <b>{item}</b>
//                   </TableCell>
//                 ) : (
//                   <TableCell key={i} align="center"
//                     sx={{ color: 'white', py: 1 }}
//                   >
//                     <b>{item}</b>
//                   </TableCell>
//                 )
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ItemList.map((item, i) => (
//               <TableRow key={i}>
//                 {item.map((obj, index) => (
//                   <TableCell
//                     key={index}
//                     align="center"
//                     sx={{ fontWeight: 'bold', py: 1 }}
//                   >
//                     {obj === 'X' ? <ClearIcon sx={{ color: 'red' }} /> : obj}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default TableUsingArray;

import ClearIcon from '@mui/icons-material/Clear';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TableUsingArray({ ItemList, HeaderArray }) {
  console.log('ItemList', ItemList);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} square>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead
            sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
          >
            <TableRow>
              {HeaderArray.map((item, i) => (
                <TableCell key={i} align="center" sx={{ color: 'white', py: 1 }}>
                  <b>{item}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow
                key={i}
                sx={(theme) => ({
                  backgroundColor: i === ItemList.length - 1 ? theme.palette.secondary.main : 'inherit',
                  color: i === ItemList.length - 1 ? theme.palette.common.white : 'inherit',
                })}
              >
                {item.map((obj, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={(theme) => ({
                      fontWeight: 'bold',
                      py: 1,
                      color: i === ItemList.length - 1 ? theme.palette.common.white : 'inherit',
                    })}
                  >
                    {obj === 'X' ? <ClearIcon sx={{ color: 'red' }} /> : obj}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableUsingArray;
