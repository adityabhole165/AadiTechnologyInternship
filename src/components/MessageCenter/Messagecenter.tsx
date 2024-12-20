import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  boxShadow:
    ' 5px 5px 10px rgba(163, 177, 198, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.2)',
  color: theme.palette.text.secondary
}));

function MessaageCenter() {
  // useEffect(() => {
  //   localStorage.setItem('url', window.location.pathname);
  // }, []);
  // const classes = Styles();
  // const pathname = window.location.pathname;
  // const pageName = pathname.replace(
  //   '/RITeSchool/MessageCenter/msgCenter/',
  //   ''
  // );
  // const [FilterData,setFilterData] = useState<boolean>(false);
  // const SearchData = (e) => {
  //   // setShow(!e.Apply);
  //   setFilterData(!e.Apply);
  // }
  // const [show, setShow] = useState(false);
  // const handleClick = (e) => {
  //   setShow(!show);
  // };
  // //  Close icon
  // const closeIconClicked = (e) =>{
  //   setShow(!e)
  // }
  // const iii = document.getElementById('mainDiv2');
  // // console.log(iii);
  // const scrolling = () => {
  // // console.log(window.scrollY)
  //   // console.log(iii);
  //   // console.log(window.innerHeight - document.documentElement.scrollTop);
  //   // console.log(document.documentElement.offsetHeight);
  //   // console.log(iii.scrollTop )
  //   // console.log(iii.offsetHeight)
  // }
  // // document.onscroll = function(){
  // //   console.log("hello");
  // // }
  // return (
  //   <>
  //     <Box sx={{ px: 2 }} >
  //       <PageHeader heading={'Message Center'} subheading={''} />
  //       {!show && (
  //         <Box sx={{ width: 'auto', marginBottom: '10px'}}>
  //           <Grid
  //             container
  //             rowSpacing={1}
  //             columnSpacing={{ xs: 1, sm: 2, md: 3 }}
  //           >
  //             <Grid item xs={3.5}>
  //               <Link
  //                 to="/RITeSchool/MessageCenter/msgCenter/Inbox"
  //                 className={classes.TextDecoration}
  //               >
  //                 <Item
  //                   sx={
  //                     pageName == '/RITeSchool/MessageCenter/msgCenter' ||
  //                     pageName == 'Inbox'
  //                       ? {
  //                           fontSize: '10px',
  //                           backgroundColor: grey[500],
  //                           color: 'white',
  //                         }
  //                       : { fontSize: '10px' }
  //                   }
  //                 >
  //                   <InboxIcon />
  //                   <br />
  //                   <b>Inbox</b>
  //                 </Item>
  //               </Link>
  //             </Grid>
  //             <Grid item xs={3.5}>
  //               <Link
  //                 to="/RITeSchool/MessageCenter/msgCenter/Sent"  //FilterData
  //                 className={classes.TextDecoration}
  //               >
  //                 <Item
  //                   sx={
  //                     pageName == 'Sent'
  //                       ? {
  //                           fontSize: '10px',
  //                           backgroundColor: grey[500],
  //                           color: 'white'
  //                         }
  //                       : { fontSize: '10px' }
  //                   }
  //                 >
  //                   <SendIcon />
  //                   <br />
  //                   <b>Sent</b>
  //                 </Item>
  //               </Link>
  //             </Grid>
  //             <Grid item xs={3.5}>
  //               <Link
  //                 to="/RITeSchool/MessageCenter/msgCenter/Trash"
  //                 className={classes.TextDecoration}
  //               >
  //                 <Item
  //                   sx={
  //                     pageName == 'Trash'
  //                       ? {
  //                           fontSize: '10px',
  //                           backgroundColor: grey[500],
  //                           color: 'white'
  //                         }
  //                       : { fontSize: '10px' }
  //                   }
  //                 >
  //                   <DeleteIcon />
  //                   <br />
  //                   <b>Trash</b>
  //                 </Item>
  //               </Link>
  //             </Grid>
  //             <Grid item xs={1.5}>
  //               <SearchIcon
  //                 sx={{
  //                   fontSize: '40px',
  //                   marginTop: '10px',
  //                   cursor: 'pointer'
  //                 }}
  //                 onClick={handleClick}
  //               />
  //             </Grid>
  //             <Grid
  //               item
  //               xs={3}
  //               sx={{
  //                 position: 'fixed',
  //                 bottom: '85px',
  //                 zIndex: '2',
  //                 width: '25vw',
  //                 marginLeft: '10px',
  //                 right: '20px'
  //               }}
  //             >
  //               <RouterLink
  //                 style={{ textDecoration: 'none' }}
  //                 to={
  //                   `/${
  //                     location.pathname.split('/')[1]
  //                   }/MessageCenter/Compose`
  //                 }
  //               >
  //                 <Item sx={{ fontSize: '10px', marginLeft: '-7px' }}>
  //                   <AddCircleIcon />
  //                   <br />
  //                   <b>Compose</b>
  //                 </Item>
  //               </RouterLink>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       )}
  //       {show && <Search  searchData={SearchData} closeSearchbarBoolean={closeIconClicked} />}
  //     </Box>
  //     {/* <div
  //       id='mainDiv2'
  //       // onScroll={scrolling}
  //       // style={{ position: 'absolute', width: '100%', paddingBottom: '100px',height:'570px' ,overflow:'auto'}}
  //     > */}
  //       <Outlet />
  //     {/* </div> */}
  //   </>
  // );
}

export default MessaageCenter;
