import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, Container, Grid, Hidden, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getChildMenuId, getMenuDescription, getNavbarMenuDetails } from 'src/requests/NavBarMenu/requestNavBarMenu';
import { RootState } from 'src/store';
// import { getWithoutHTML, sitePath } from "../Common/Util";
import NavContent from "./NavContent";
export function getWithoutHTML(value) {
  var div = document.createElement('div');
  div.innerHTML = value;
  var text = div.textContent || div.innerText || '';
  return text;
};

function NavBarMenus() {
  const dispatch = useDispatch();

  const GetNavbarmenu: any = useSelector((state: RootState) => state.NavbarMenu.GetNavbarMenuDetails);
  const MenuDescription: any = useSelector((state: RootState) => state.NavbarMenu.MenuDescription);
  const ChildMenuId: any = useSelector((state: RootState) => state.NavbarMenu.ChildMenuId);

  const RoleId = sessionStorage.getItem('RoleId');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const [childMenu, setChildMenu] = useState([])
  const [searchMenu, setSearchMenu] = useState([])
  const [searchText, setSearchText] = useState('')
  const [ShowSearch, setShowSearch] = useState(false)
  const [parentMenu, setParentMenu] = useState([])
  const [menuId, setMenuId] = useState(0)
  const [SelectedMenu, setSelectedMenu] = useState({ MenuId: 0, ParentMenuId: 0 })
  const [ParentMenuId, setParentMenuId] = useState(0)
  // const [ChildMenuId, setChildMenuId] = useState(0)
  const [MenuContent, setMenuContent] = useState('')
  const IGetMenuDetailsBody =
  {
    aiSchoolId: asSchoolId,
    aiUserRoleId: RoleId,
    IsRefresh: false
  }
  useEffect(() => {
    if (SelectedMenu.MenuId == 0)
      setParentMenu(GetNavbarmenu.filter((item) => { return item.LevelIndex == 1 }))
    // setParentMenu(GetNavbarmenu.filter((item) => { return item.ParentMenuId == SelectedMenu.MenuId }))
    else {

      let parentMenu = []
      let parentMenus = [SelectedMenu.MenuId]
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          if (!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId)
        }
      })
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          if (!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId)
        }
      })
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          if (!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId)
        }
      })
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          parentMenu.push(item)
        }
      })
      setParentMenu(parentMenu)
      setChildMenu(GetNavbarmenu.filter((item) => { return item.ParentMenuId == SelectedMenu.MenuId }))
    }
  }, [GetNavbarmenu, SelectedMenu]);

  useEffect(() => {
    getParentMenus()
    getChildMenus()
  }, [ParentMenuId, ChildMenuId])
  const clickMenu = (value) => {
    setMenuContent('')
    setShowSearch(false)

    setParentMenuId(value.ParentMenuId)
    dispatch(getChildMenuId(value.MenuId))
    setSelectedMenu(value)
    let Menus = getMenuById(value.MenuId)
    if (Menus?.MenuTypeId == "2") {
      dispatch(getMenuDescription({ aiMenuId: Menus.MenuId, aiSchoolId: asSchoolId }))
    }
  }
  useEffect(() => {
    if (MenuDescription.length > 0) {
      setMenuContent(MenuDescription[0].MenuContent)
    }
  }, [MenuDescription])

  useEffect(() => {
    dispatch(getNavbarMenuDetails({ ...IGetMenuDetailsBody, IsRefresh: false }));
  }, []);
  const clickRefresh = () => {
    dispatch(getNavbarMenuDetails({ ...IGetMenuDetailsBody, IsRefresh: true }));
  }
  // useEffect(() => {
  //     setSearchMenu(GetNavbarmenu)
  // }, [GetNavbarmenu]);

  const changeSearchText = () => {
    setShowSearch(true)
    let value = searchText
    if (value.length > 3) {
      let values = value.split(" ")
      if (value.length > 3)
        // setSearchMenu(GetNavbarmenu.filter((item) => { return item.MenuName.includes(value)}))
        setSearchMenu(GetNavbarmenu
          .filter((item) => {
            return item.MenuName.toLowerCase().includes(value.toLowerCase())
            // return values.toLowerCase().includes(item.MenuName.toLowerCase())
          }))
    }
    else {
      setSearchMenu([])
    }
  }
  const getMargin = (value) => {
    return value * 4
  }

  const getMenuById = (MenuId) => {
    let arr = []
    let returnVal = null

    GetNavbarmenu
      .filter((item) => { return item.MenuId == MenuId })
      .map((item) => {
        if (!arr.includes(item.MenuId)) {
          arr.push(item.MenuId);
          returnVal = item;
        }
      })
    return returnVal
  }
  const getParentMenus = () => {
    let returnVal = []
    let MenuId = ChildMenuId
    let Menus = getMenuById(MenuId)


    while (Menus !== null) {
      returnVal = [Menus, ...returnVal]
      // returnVal.push(Menus)
      MenuId = Menus.ParentMenuId
      Menus = getMenuById(MenuId)
    }
    return returnVal
  }
  const [displayMenu, setDisplayMenu] = useState([])

  const getChildMenus = () => {
    let arr = []
    let returnVal = []
    GetNavbarmenu
      .filter((item) => { return item.ParentMenuId == ChildMenuId })
      .map((item) => {

        if (!arr.includes(item.MenuId)) {
          arr.push(item.MenuId);
          returnVal.push(item);
        }
      })
    return returnVal
  }
  const IsFile = () => {
    let returnVal = false
    GetNavbarmenu
      .filter((item) => { return item.MenuId == ChildMenuId })
      .map((item, index) => {
        if (item.FilePath != "")
          returnVal = true
      })
    return returnVal
  }
  const IsContent = () => {
    let returnVal = IsFile()
    if (MenuContent != "")
      returnVal = true
    return returnVal
  }

  return (
    <Container maxWidth={'xl'}>
      <PageHeader heading={'School Menus'} subheading={''} />
      <Hidden smUp>
        <Box sx={{ float: "right", mt: "-45px" }}>
          <RefreshIcon onClick={() => { clickRefresh() }} fontSize="medium" />
        </Box>
      </Hidden>
      {
        ShowSearch &&
        <Grid container>
          <Grid item xs={6}>
            <TextField label='Search' fullWidth onChange={(e) => { setSearchText(e.target.value) }} value={searchText} />
          </Grid><Grid item xs={6}>

            <SearchIcon fontSize="large" onClick={changeSearchText}
              sx={{ marginTop: '8px', cursor: 'pointer' }}
            />
          </Grid></Grid>
      }
      {ShowSearch ?
        ((searchText.length <= 3)
          ?
          <ErrorMessages Error={'Please enter more than 3 characters'} />
          :
          (searchMenu.length == 0)
            ?
            <ErrorMessages Error={'No records found'} />
            :
            <Grid container >

              {searchMenu.map((item, index) => (
                <Grid item xs={12} key={index} onClick={() => { clickMenu(item) }}>
                  <Card component={Box} padding={1} mt={1}>
                    {item.MenuName}
                  </Card>

                </Grid>
              ))}

            </Grid>) :
        (<>
          <Typography variant='h4' sx={{ backgroundColor: 'white', p: 1 }}>Menu</Typography>
          {
            (parentMenu.length == 0)
              ?
              <ErrorMessages Error={'No records found'} />
              :
              <Grid container >
                <Grid item xs={12} onClick={() => { clickMenu({ ParentMenuId: "0", MenuId: "0" }) }}>
                  <Card component={Box} padding={1} mt={1}  >
                    Home
                  </Card>

                </Grid>
                {
                  // parentMenu.map((item, index) => 
                  //   GetNavbarmenu
                  // .filter((item) => { return item.ParentMenuId == ParentMenuId })

                  getParentMenus()
                    .map((item, index) =>
                    (
                      <Grid item xs={12} key={index} onClick={() => { clickMenu(item) }}>
                        <Card component={Box} padding={1} mt={1} ml={item.ParentMenuId ? getMargin(index + 1) : 4} >
                          {item.MenuName}
                        </Card>

                      </Grid>
                    ))

                }
              </Grid>
          }
          <br></br>
          {IsContent() && <>
            <Typography variant='h4' sx={{ backgroundColor: 'white', p: 1 }}>Content</Typography>
            <NavContent /> </>
          }
          <br></br>
          <Typography variant='h4' sx={{ backgroundColor: 'white', p: 1 }}>Sub-Menu</Typography>
          {
            (getChildMenus().length == 0)
              ?
              <ErrorMessages Error={'No records found'} />
              :
              <Grid container >
                {getChildMenus().map((item, index) => (
                  <Grid item xs={12} key={index} onClick={() => { clickMenu(item) }}>
                    <Card component={Box} padding={1} mt={1}>
                      {item.MenuName}
                    </Card>

                  </Grid>
                ))}
              </Grid>
          }
        </>
        )}

    </Container>
  )
}

export default NavBarMenus;