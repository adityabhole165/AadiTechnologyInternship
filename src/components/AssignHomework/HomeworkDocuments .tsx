import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody
} from 'src/interfaces/AssignHomework/IHomeworkDocuments';
import PageHeader from 'src/libraries/heading/PageHeader';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import {
  DeleteDocument,
  GetAllHomeworkDocuments
} from 'src/requests/AssignHomework/requestHomeworkDocuments';
import { RootState } from 'src/store';

import { Box, Grid } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';

const HomeworkDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id } = useParams();
  // alert(Id)
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const HeaderList = ['FileName ', 'Delete'];
  const IconList = [
    {
      Id: 1,
      Icon: <CancelIcon />,
      Action: 'View'
    }
  ];

  const AllHomeworkDocuments = useSelector(
    (state: RootState) => state.Homeworkdocument.GetAllHomeworkDocuments
  );
  //console.log(AllHomeworkDocuments, "AllHomeworkDocuments....")

  const DeleteHomeworkDocument = useSelector(
    (state: RootState) => state.Homeworkdocument.DeleteHomeworkDocument
  );
  console.log(DeleteHomeworkDocument, 'DeleteHomeworkDocument....');

  const IGetAllHomeworkDocuments: IGetAllHomeworkDocumentsBody = {
    asSchoolId: asSchoolId,
    asHomeworkId: Number(Id),
    asAcademicyearId: asAcademicYearId
  };

  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));
  }, []);
  const ClickDelete = (Id) => {
    if (confirm('Are You Sure you want to delete The List')) {
      const DeleteHomeworkDocumentBody: IDeleteHomeworkDocumentBody = {
        asSchoolId: asSchoolId,
        asUpdatedById: Number(asTeacherId),
        asHomeworkId: Number(Id),
        asAcademicYearId: asAcademicYearId
      };
      dispatch(DeleteDocument(DeleteHomeworkDocumentBody));
    }
  };
  const click = () => {
    navigate('/extended-sidebar/Teacher/AddHomework');
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

      <PageHeader heading={'Documents'} />

      <Grid item xs={12}>
        {AllHomeworkDocuments != undefined && (
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={AllHomeworkDocuments}
            ClickItem={ClickDelete}
            IconList={IconList}
          />
        )}
      </Grid>
      <Box sx={{ textAlign: 'center' }} m={2}>
        <ButtonPrimary style={{ backgroundColor: '#ef5350' }} onClick={click}>
          CLOSE
        </ButtonPrimary>
      </Box>
    </div>
  );
};

export default HomeworkDocuments;
