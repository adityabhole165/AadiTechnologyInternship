import { Container } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getNavbarMenuDetails } from 'src/requests/NavBarMenu/requestNavBarMenu';

function NavBarMenus() {
    const dispatch = useDispatch();

    const GetNavbarmenu: any = useSelector(
        (state: RootState) => state.NavbarMenu.GetNavbarMenuDetails
    );
    console.log("GetNavbarmenu",GetNavbarmenu)

    const RoleId = sessionStorage.getItem('RoleId');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const IGetMenuDetailsBody =
    {
        aiSchoolId: asSchoolId,  
        aiUserRoleId :RoleId
    }

    useEffect(() => {
        dispatch(getNavbarMenuDetails(IGetMenuDetailsBody));
    }, []);
  return (
    <Container>
             <PageHeader heading={'Navbar Menus'} subheading={''} />
    </Container>
  )
}

export default NavBarMenus;