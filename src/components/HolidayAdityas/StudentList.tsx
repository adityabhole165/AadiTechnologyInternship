// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import CommonPageHeader from '../CommonPageHeader';
// import { Box } from '@mui/material';
// import ToggleIconButton from './ToggleIconButton';

// function not(a: readonly number[], b: readonly number[]) {
//   return a.filter((value) => !b.includes(value));
// }

// function intersection(a: readonly number[], b: readonly number[]) {
//   return a.filter((value) => b.includes(value));
// }

// export default function TransferList() {
//   const [checked, setChecked] = React.useState<readonly number[]>([]);
//   const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
//   const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

//   const leftChecked = intersection(checked, left);
//   const rightChecked = intersection(checked, right);

//   const handleToggle = (value: number) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   const handleAllRight = () => {
//     setRight(right.concat(left));
//     setLeft([]);
//   };

//   const handleCheckedRight = () => {
//     setRight(right.concat(leftChecked));
//     setLeft(not(left, leftChecked));
//     setChecked(not(checked, leftChecked));
//   };

//   const handleCheckedLeft = () => {
//     setLeft(left.concat(rightChecked));
//     setRight(not(right, rightChecked));
//     setChecked(not(checked, rightChecked));
//   };

//   const handleAllLeft = () => {
//     setLeft(left.concat(right));
//     setRight([]);
//   };

//   const customList = (items: readonly number[]) => (
//     <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
//       <List dense component="div" role="list">
//         {items.map((value: number) => {
//           const labelId = `transfer-list-item-${value}-label`;

//           return (
//             <ListItemButton key={value} role="listitem" onClick={handleToggle(value)}>
//               <ListItemIcon>
//                 <Checkbox
//                   checked={checked.includes(value)}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{ 'aria-labelledby': labelId }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={`Student ${value + 1}`} />
//             </ListItemButton>
//           );
//         })}
//       </List>
//     </Paper>
//   );

//   return (
//     <>
//     <Box sx={{ px: 2 }}>
    
//           <CommonPageHeader
//             navLinks={
//               [
//                 {
//                   title: 'StudentList',
//                   path: '/extended-sidebar/Teacher/StudentList'
//                 }
//               ]
//             }
//           />
    
//         </Box>
//         <Grid
//       container
//       sx={{
//         height: '10vh',
//         marginRight: '10%', // Full viewport height for vertical centering

//       }}
//     >
//       <Grid item>
//         <ToggleIconButton />
//       </Grid>
//     </Grid>
         
//         <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
           
//       <Grid item>{customList(left)}</Grid>
//       <Grid item>
//         <Grid container direction="column" sx={{ alignItems: 'center' }}>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleAllRight}
//             disabled={left.length === 0}
//             aria-label="move all right"
//           >
//             ≫
//           </Button>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleCheckedRight}
//             disabled={leftChecked.length === 0}
//             aria-label="move selected right"
//           >
//             &gt;
//           </Button>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleCheckedLeft}
//             disabled={rightChecked.length === 0}
//             aria-label="move selected left"
//           >
//             &lt;
//           </Button>
//           <Button
//             sx={{ my: 0.5 }}
//             variant="outlined"
//             size="small"
//             onClick={handleAllLeft}
//             disabled={right.length === 0}
//             aria-label="move all left"
//           >
//             ≪
//           </Button>
//         </Grid>
//       </Grid>
//       <Grid item>{customList(right)}</Grid>
//     </Grid>
//     </>
    
    
//   );
// }
import * as React from 'react';
import { Box } from '@mui/material';
import CommonPageHeader from '../CommonPageHeader';
import ToggleIconButton from './ToggleIconButton';
import TransferListComponent from './TransferListComponent';


export default function StudentList() {
  const leftList = [
    { id: 0, label: 'Student 1' },
    { id: 1, label: 'Student 2' },
    { id: 2, label: 'Student 3' },
    { id: 3, label: 'Student 4' }
  ];

  const rightList = [
    { id: 4, label: 'Student 5' },
    { id: 5, label: 'Student 6' },
    { id: 6, label: 'Student 7' },
    { id: 7, label: 'Student 8' }
  ];

  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[{ title: 'StudentList', path: '/extended-sidebar/Teacher/StudentList' }]}
        />
      </Box>

      <Box sx={{ px: 2, my: 2 }}>
        <ToggleIconButton />
      </Box>

      <TransferListComponent leftItems={leftList} rightItems={rightList} />
    </>
  );
}
