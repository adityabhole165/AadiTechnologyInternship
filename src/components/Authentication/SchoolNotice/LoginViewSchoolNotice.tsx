import { useParams } from "react-router";
import IViewschoolnotice from '../../../interfaces/Student/LoginViewSchoolNotice'
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { getLoginViewSchoolNotice } from 'src/requests/Student/LoginSchoolNotice'
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { GetSchoolNoticesResult } from '../../../interfaces/Student/LoginSchoolNotice'
import Card6 from "src/libraries/card/card6";
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
    const userId = localStorage.getItem('UserId');

    const { ID } = useParams();
    const body: IViewschoolnotice = {
        "asSchoolId": asSchoolId,
        "asNoticeId": `${ID}`,
        "asUserId": userId
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