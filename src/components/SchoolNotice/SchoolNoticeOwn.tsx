import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import { IGetAllActiveNoticesBody } from 'src/interfaces/Student/ISchoolNoticeBoard';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import BackButton from 'src/libraries/button/BackButton';
import CardNotice from 'src/libraries/card/CardNotice';
import CardNoticeOwn from 'src/libraries/card/CardNoticeOwn';
import List1 from 'src/libraries/mainCard/List1';
import { getAllActiveNotices } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import { getSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import { RootState } from 'src/store';
import ISchoolnotice from '../../interfaces/Common/SchoolNotice';
import { encodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';



function Schoolnotice() {
    const theme = useTheme();
    const classes = Styles();
    const dispatch = useDispatch();
    const SchoolnoticeList = useSelector(
        (state: RootState) => state.Schoolnotice.SchoolNoticeData
    );

    const GetAllActiveNotices = useSelector(
        (state: RootState) => state.SchoolNoticeBoard.AllActiveNotices
    );

    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = sessionStorage.getItem('Id');

    const loading = useSelector((state: RootState) => state.Schoolnotice.Loading);

    const body: ISchoolnotice = {
        asSchoolId: asSchoolId,
        asNoticeId: 0,
        asUserId: asUserId
    };

    const ActiveNoticesBody: IGetAllActiveNoticesBody = {
        asSchoolId: asSchoolId,
        asUserId: asUserId
    };
    useEffect(() => {
        if (sessionStorage.getItem('Id') !== null)
            localStorage.setItem('url', window.location.pathname);
        dispatch(getSchoolNotice(body));
    }, []);
    const [drop, setDrop] = useState('');

    useEffect(() => {
        dispatch(getAllActiveNotices(ActiveNoticesBody));
    }, []);
    let filevalue = '';
    const name = GetAllActiveNotices.filter((item, i) => {
        return drop == item.id ? (filevalue = item.FileName) : '';
    });

    const Data = SchoolnoticeList.map((item, index) => {
        const date = item.Date;
        const day = new Date(date).getDate();
        const month = new Date(date).toLocaleString('default', { month: 'short' });
        const year = new Date(date).getFullYear();
        const newdate = `${day} ${month} ${year}`;
        return {
            id: index,
            header: item.Name,
            text1: newdate,
            text2: '',
            linkPath: '/Common/Viewschoolnotice/' + encodeURL(item.Id),
            FileName: item.FileName
        };
    });
    const [Data1, setData1] = useState([]);
    useEffect(() => {
        let arr = [];
        if (localStorage.getItem('ImportantNotices') !== null)
            arr = localStorage.getItem('ImportantNotices').split(',');
        setData1(
            GetAllActiveNotices.filter((obj) => !arr.includes(obj.Id)).map(
                (item, index) => {
                    return {
                        id: item.Id,
                        header: item.Name,
                        text2: '',
                        linkPath: '/Common/Viewschoolnotice/' + encodeURL(item.Id),
                        FileName: item.FileName,
                        IsText: item.IsText,
                        IsImageNotice: item.IsImageNotice,
                        isActive: false
                    };
                }
            )
        );
    }, [GetAllActiveNotices]);

    const downloadNotice = (FileName, IsImageNotice) => {
        if (!IsImageNotice) {
            window.open(
                localStorage.getItem('SiteURL') +
                'RITeSchool/DOWNLOADS/School Notices/' +
                FileName
            );
        } else {
            window.open(
                localStorage.getItem('SiteURL') + 'RITeSchool/Images/' + FileName
            );
        }
    };

    const clickSingle = (value) => {
        // let arr = (localStorage.getItem("ImportantNotices")!==undefined)?localStorage.getItem("ImportantNotices")?.split(","):[]
        let arr = [];
        if (localStorage.getItem('ImportantNotices') !== null)
            arr = localStorage.getItem('ImportantNotices').split(',');
        console.log(
            localStorage.getItem('ImportantNotices'),
            'ImportantNotices',
            arr
        );
        if (value.checked) {
            arr.push(value.value);
        } else arr = arr.filter((item) => item !== value.value);
        localStorage.setItem('ImportantNotices', arr.toString());
        setData1(
            Data1.map((obj) => {
                return obj.id === value.value
                    ? { ...obj, isActive: value.checked }
                    : obj;
            })
        );
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'School Notice',
                        path: ''
                    }
                ]}
            />
            {/* <Typography variant="h3" pl={5.5} pt={2.4} mb={2} >
                   School Notice 
         </Typography> */}


            <Box sx={{ background: 'white', p: 2 }}>

                {/* {GetAllActiveNotices.length > 0 && (
                    <CardNoticeOwn
                        itemList={Data1}
                        downloadNotice={downloadNotice}
                        clickSingle={clickSingle}
                    />
                )} */}
                {GetAllActiveNotices.length > 0 && (
                    asSchoolId === '18' ? (
                        <CardNotice
                            itemList={Data1}
                            downloadNotice={downloadNotice}
                            clickSingle={clickSingle}
                        />
                    ) : (
                        <CardNoticeOwn
                            itemList={Data1}
                            downloadNotice={downloadNotice}
                            clickSingle={clickSingle}
                        />
                    )
                )}

                {sessionStorage.getItem('Id') === null && (
                    <BackButton FromRoute={'/schoolList'} />
                )}
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        <List1 items={Data} />
                    </>
                )}
            </Box>
        </Box>
    );
}
export default Schoolnotice;
