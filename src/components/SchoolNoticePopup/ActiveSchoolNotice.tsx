import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllActiveNoticesBody } from 'src/interfaces/Student/ISchoolNoticeBoard';
import { getAllActiveNotices } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import { RootState } from 'src/store';
import CardNotice from './CardNotice';


const ActiveSchoolNotice = ({ clickOpen }) => {
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const [Data1, setData1] = useState([])
  const GetAllActiveNotices = useSelector(
    (state: RootState) => state.SchoolNoticeBoard.AllActiveNotices
  );
  useEffect(() => {
    let arr = []
    if (localStorage.getItem("ImportantNotices") !== null) {
      let noticeObj = JSON.parse(localStorage.getItem("ImportantNotices").toString())
      noticeObj.map((item) => {
        if (item.UserId == asUserId)
          arr = item.ids.split(",")
      })
    }
    setData1(GetAllActiveNotices
      .filter((obj) => (!(arr.includes(obj.Id)) && (obj.DisplayLocation === 'B' || obj.DisplayLocation === 'C')))
      .map((item, index) => {
        return {
          id: item.Id,
          header: item.Name,
          text2: '',
          linkPath: '/Common/ViewActiveNotice/' + item.Id,
          FileName: item.FileName,
          IsText: item.IsText,
          Content: item.Content,
          IsImageNotice: item.IsImageNotice,
          DisplayLocation: item.DisplayLocation,
          isActive: false
        };
      }))
  }, [GetAllActiveNotices])

  useEffect(() => {
    const ActiveNoticesBody: IGetAllActiveNoticesBody = {
      asSchoolId: asSchoolId,
      asUserId: asUserId
    };
    dispatch(getAllActiveNotices(ActiveNoticesBody));
  }, []);
  const downloadNotice = (FileName, IsText, Content) => {
    clickOpen({ FileName: FileName, IsText: IsText, Content: Content })
    // if (!IsImageNotice) {
    //   window.open(localStorage.getItem('SiteURL') + 'RITeSchool/DOWNLOADS/School Notices/' + FileName)
    // } else {
    //   window.open(localStorage.getItem('SiteURL') + 'RITeSchool/Images/' + FileName)
    // }
  }

  const clickSingle = (value) => {
    // let arr = (localStorage.getItem("ImportantNotices")!==undefined)?localStorage.getItem("ImportantNotices")?.split(","):[]
    let arr = [], noticeObj = [], userExists = false
    let ImportantNotices = localStorage.getItem("ImportantNotices")
    if (ImportantNotices !== null &&
      ImportantNotices !== undefined) {
      noticeObj = JSON.parse(ImportantNotices)
      noticeObj.map((item) => {
        if (item.UserId == asUserId) {
          userExists = true
          arr = item.ids.split(",")
        }
      }
      )
    }

    if (value.checked)
      arr.push(value.value)
    else
      arr = arr.filter(item => item !== value.value)

    if (userExists) {
      let obj = []
      noticeObj.map((item) => {
        obj.push({
          UserId: item.UserId,
          ids: item.UserId == asUserId ? arr.toString() : item.ids
        })
      }
      )
      noticeObj = obj;
    } else {
      noticeObj.push({ UserId: asUserId, ids: arr.toString() })
    }

    localStorage.setItem("ImportantNotices", JSON.stringify(noticeObj))
    setData1(Data1.map((obj) => {
      return obj.id === value.value ?
        { ...obj, isActive: value.checked } :
        obj
    }
    ))
  }
  return (
    <Container>
      {/* <PageHeader heading={'School Notices'} subheading={''} /> */}

      {Data1.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <CardNotice
              item={item}
              downloadNotice={downloadNotice}
              clickSingle={clickSingle}
            />
          </div>);
      })} </Container>
  )
}

export default ActiveSchoolNotice