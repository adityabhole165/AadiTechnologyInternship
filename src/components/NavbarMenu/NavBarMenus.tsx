import { Container, Grid, TextField, Typography , Card ,Box} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getNavbarMenuDetails } from 'src/requests/NavBarMenu/requestNavBarMenu';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';

function NavBarMenus() {
    const dispatch = useDispatch();

    const GetNavbarmenu: any = useSelector(
        (state: RootState) => state.NavbarMenu.GetNavbarMenuDetails
    );
    console.log("GetNavbarmenu",GetNavbarmenu)

    const RoleId = sessionStorage.getItem('RoleId');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const [childMenu, setChildMenu] = useState([])
    const [searchMenu, setSearchMenu] = useState([])
    const [searchText, setSearchText] = useState('')
    const [parentMenu, setParentMenu] = useState([])
    const [menuId, setMenuId] = useState(0)
    const [ParentMenuId, setParentMenuId] = useState(0)

    const IGetMenuDetailsBody =
    {
        aiSchoolId: asSchoolId,  
        aiUserRoleId :RoleId
    }
    useEffect(() => {
      if (menuId == 0)
        setParentMenu(GetNavbarmenu.filter((item) => { return item.ParentMenuId == menuId }))
      else {
  
        let parentMenu = []
        let parentMenus = [menuId]
        GetNavbarmenu.map((item) => {
          if (parentMenus.includes(item.MenuId)) {
            if(!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId)
          }
        })
        console.log(parentMenus,"parentMenus1")
          GetNavbarmenu.map((item) => {
          if (parentMenus.includes(item.MenuId)) {
            if(!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId)
          }
        })
        console.log(parentMenus,"parentMenus1")
          GetNavbarmenu.map((item) => {
          if (parentMenus.includes(item.MenuId)) {
            if(!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId)
          }
        })
        console.log(parentMenus,"parentMenus2")
          GetNavbarmenu.map((item) => {
          if (parentMenus.includes(item.MenuId)) {
            parentMenu.push(item)
          }
        })
        setParentMenu(parentMenu)
        setChildMenu(GetNavbarmenu.filter((item) => { return item.ParentMenuId == menuId }))
      }
    }, [GetNavbarmenu, menuId]);

    const clickMenu = (MenuId, ParentMenuId) => {
      // alert(value)1
      setMenuId(MenuId)
      setParentMenuId(ParentMenuId)
    }

    useEffect(() => {
      dispatch(getNavbarMenuDetails(IGetMenuDetailsBody));
  }, []);

  // useEffect(() => {
  //     setSearchMenu(GetNavbarmenu)
  // }, [GetNavbarmenu]);

  const changeSearchText = (value) => {
    if(value.length>3)
    // setSearchMenu(GetNavbarmenu.filter((item) => { return item.MenuName.includes(value)}))
    setSearchMenu(GetNavbarmenu.filter((item) => { return item.MenuName.toLowerCase().includes(value.toLowerCase())}))
    setSearchText(value);
  }
  const getMargin = (value) =>{
    return value * 4
  }

  return (
    <Container>
             <PageHeader heading={'Navbar Menus'} subheading={''} />
             <TextField label='Search' fullWidth onChange={(e)=>{changeSearchText(e.target.value)}} value={searchText}/>
             <br></br>
             <br></br>
      {
        (searchMenu.length == 0)
          ?
          <ErrorMessages Error={'No records found'} />
          :
          <Grid container >
           
            {searchMenu.map((item, index) => (
              <Grid item xs={12} key={index} onClick={() => { clickMenu(item.MenuId, item.ParentMenuId) }}>
                <Card component={Box} padding={1} mt={1}>
                {item.MenuName}
                </Card>
               
              </Grid>
            ))}
         
          </Grid>
      }

      <br></br>
      
          <Typography variant='h4'>Parent</Typography> 
      {
        (parentMenu.length == 0)
          ?
          <ErrorMessages Error={'No records found'} />
          :
          <Grid container >
            {
            parentMenu.map((item, index) => 
            
            (
              <Grid item xs={12} key={index} onClick={() => { clickMenu(item.MenuId, item.ParentMenuId) }}>
                <Card component={Box} padding={1} mt={1} ml={item.ParentMenuId ? getMargin(index) : 0} >
                {item.MenuName}
                </Card>
             
              </Grid>
            ))}
          </Grid>
      }
      <br></br> 
      <Typography variant='h4'>Child</Typography>
      {
        (childMenu.length == 0)
          ?
          <ErrorMessages Error={'No records found'} />
          :
          <Grid container >
            {childMenu.map((item, index) => (
              <Grid item xs={12} key={index} onClick={() => { clickMenu(item.MenuId, item.ParentMenuId) }}>
                  <Card component={Box} padding={1} mt={1}>
                  {item.MenuName}
                  </Card>
              
              </Grid>
            ))}
          </Grid>
      }
    </Container>
  )
}

export default NavBarMenus;