import { useParams } from "react-router";
import IViewschoolnotice from '../../../Interface/Student/LoginViewSchoolNotice'
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getLoginViewSchoolNotice } from 'src/Client_Api/Student/LoginSchoolNotice'
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { GetSchoolNoticesResult } from '../../../Interface/Student/LoginSchoolNotice'
import Card6 from "src/UI_Library/card/card6";
import { Styles } from "src/assets/style/student-style";
import school5 from 'src/assets/img/school5.jpg';


function LoginViewSchoolNotice() {

    const styleroot = Styles();
    const styles = {
        paperContainer: {
            backgroundImage: `url(${school5})`,
            backgroundColor: "#2c171738",
            height: '100%'
        },

    };


    const dispatch = useDispatch();

    const LoginViewSchoolNotice = useSelector((state: RootState) => state.LoginList.LoginViewSchoolNoticeData);

    const asSchoolId = localStorage.getItem('localSchoolId');
    const Id = sessionStorage.getItem('Id');

    const { ID } = useParams();
    const body: IViewschoolnotice = {
        "asSchoolId": asSchoolId,
        "asNoticeId": `${ID}`,
        "asUserId": "0"
    };

    useEffect(() => {
        dispatch(getLoginViewSchoolNotice(body))
    }, [])

    return (
        <div style={styles.paperContainer}>
            {
                LoginViewSchoolNotice.map((items: GetSchoolNoticesResult, i) => (
                    <Card6 FileName={items.FileName} Content={items.Content} Name={items.Name}
                        key={i} />
                ))
            }

        </div>

    )
}

export default LoginViewSchoolNotice