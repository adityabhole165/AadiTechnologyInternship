import React from 'react';
import ISchoolnotice, { GetSchoolNoticesResult } from 'src/Interface/Student/LoginSchoolNotice';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginSchoolNotice } from 'src/Client_Api/Student/LoginSchoolNotice';
import { useSelector } from "react-redux";
import PageHeader from "src/UI_Library/heading/PageHeader";
import { RootState } from 'src/store';
import { Link, useLocation } from 'react-router-dom';
// import List2 from "src/library/Lists small/List1";
import List1 from "src/UI_Library/Lists small/List";
import BackButton from 'src/UI_Library/button/BackButton'
import { Box, Grid } from '@mui/material';
import { Styles } from "src/assets/style/student-style";
import school5 from 'src/assets/img/school5.jpg';


function LoginSchoolNotice() {

    const styleroot = Styles();
    const styles = {
        paperContainer: {
            backgroundImage: `url(${school5})`,
            backgroundColor: "#2c171738"
        },

    };


    const dispatch = useDispatch();
    const LoginSchoolNoticeList = useSelector((state: RootState) => state.LoginList.LoginSchoolNoticeData)

    const asSchoolId = localStorage.getItem('localSchoolId');
    const Id = sessionStorage.getItem('Id');

    let location = useLocation();

  

    const body: ISchoolnotice = {
        "asSchoolId":asSchoolId,
        "asNoticeId": 0,
        "asUserId": "0",
    };

    useEffect(() => {
        dispatch(getLoginSchoolNotice(body))
    }, [])


    return (
    <>
        <Grid style={styles.paperContainer}>

            <PageHeader heading={"School Notice"} subheading={""} />
            <Box sx={{ marginBottom: '3rem', marginLeft: '2rem', marginTop: '-2.5rem' }}>
                <BackButton /></Box>
            {
                LoginSchoolNoticeList.map(
                    (items: GetSchoolNoticesResult, i) =>
                        <Link style={{ textDecoration: "none" }} key={i}
                            to={
                                "/LoginViewSchoolNotice/" + items.Id
                            }>
                            {/* <List2 Date={items.Date} Name={items.Name} FileName={items.FileName} key={i} /> */}
                            <List1 Date={items.Date} Name={items.Name} FileName={items.FileName} key={i} />
                        </Link>
                )
            }


        </Grid>
    </>
    )


}

export default LoginSchoolNotice;