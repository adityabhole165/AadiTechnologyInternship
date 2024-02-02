import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getNavbarMenuDetails } from 'src/requests/NavBarMenu/requestNavBarMenu';
import { RootState } from 'src/store';

function NavBarMenus() {
  const dispatch = useDispatch();

  const GetNavbarmenu: any = useSelector(
    (state: RootState) => state.NavbarMenu.GetNavbarMenuDetails
  );

  const RoleId = sessionStorage.getItem('RoleId');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const [childMenu, setChildMenu] = useState([]);
  const [searchMenu, setSearchMenu] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [parentMenu, setParentMenu] = useState([]);
  const [menuId, setMenuId] = useState(0);
  const [SelectedMenu, setSelectedMenu] = useState({
    MenuId: 0,
    ParentMenuId: 0
  });
  const [ParentMenuId, setParentMenuId] = useState(0);

  const IGetMenuDetailsBody = {
    aiSchoolId: asSchoolId,
    aiUserRoleId: RoleId
  };
  useEffect(() => {
    if (SelectedMenu.MenuId == 0)
      setParentMenu(
        GetNavbarmenu.filter((item) => {
          return item.LevelIndex == 1;
        })
      );
    // setParentMenu(GetNavbarmenu.filter((item) => { return item.ParentMenuId == SelectedMenu.MenuId }))
    else {
      let parentMenu = [];
      let parentMenus = [SelectedMenu.MenuId];
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          if (!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId);
        }
      });
      console.log(parentMenus, 'parentMenus1');
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          if (!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId);
        }
      });
      console.log(parentMenus, 'parentMenus1');
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          if (!parentMenus.includes(item.ParentMenuId))
            parentMenus.push(item.ParentMenuId);
        }
      });
      console.log(parentMenus, 'parentMenus2');
      GetNavbarmenu.map((item) => {
        if (parentMenus.includes(item.MenuId)) {
          parentMenu.push(item);
        }
      });
      setParentMenu(parentMenu);
      setChildMenu(
        GetNavbarmenu.filter((item) => {
          return item.ParentMenuId == SelectedMenu.MenuId;
        })
      );
    }
  }, [GetNavbarmenu, SelectedMenu]);

  const clickMenu = (value) => {
    console.log(value.FilePath, 'FilePath');
    // if(value.FilePath==""){
    setSelectedMenu(value);
    // }else{
    //   window.open(value.FilePath)
    // }
    // setParentMenuId(ParentMenuId)
  };

  useEffect(() => {
    dispatch(getNavbarMenuDetails(IGetMenuDetailsBody));
  }, []);

  // useEffect(() => {
  //     setSearchMenu(GetNavbarmenu)
  // }, [GetNavbarmenu]);

  const changeSearchText = (value) => {
    if (value.length > 3)
      // setSearchMenu(GetNavbarmenu.filter((item) => { return item.MenuName.includes(value)}))
      setSearchMenu(
        GetNavbarmenu.filter((item) => {
          return item.MenuName.toLowerCase().includes(value.toLowerCase());
        })
      );
    setSearchText(value);
  };
  const getMargin = (value) => {
    return value * 4;
  };

  return (
    <Container>
      <PageHeader heading={'Navbar Menus'} subheading={''} />
      <TextField
        label="Search"
        fullWidth
        onChange={(e) => {
          changeSearchText(e.target.value);
        }}
        value={searchText}
      />
      <br></br>
      <br></br>
      {searchMenu.length == 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <Grid container>
          {searchMenu.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => {
                clickMenu(item);
              }}
            >
              <Card component={Box} padding={1} mt={1}>
                {item.MenuName}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <br></br>

      <Typography variant="h4">Parent</Typography>
      {parentMenu.length == 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <Grid container>
          {parentMenu.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => {
                clickMenu(item);
              }}
            >
              <Card
                component={Box}
                padding={1}
                mt={1}
                ml={item.ParentMenuId ? getMargin(index) : 0}
              >
                {item.MenuName}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <br></br>
      <Typography variant="h4">Child</Typography>
      {childMenu.length == 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <Grid container>
          {childMenu.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => {
                clickMenu(item);
              }}
            >
              <Card component={Box} padding={1} mt={1}>
                {item.MenuName}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default NavBarMenus;
