import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { RootState } from 'src/store';
import { IGetUnPublishResltBody } from 'src/interfaces/PrePrimaryResult/IUnpublishPrePrimaryResult';
import {UnPublished} from 'src/requests/PrePrimaryResult/RequestUnpublishPrePrimaryResult';
import { string } from 'prop-types';
import Dropdown from 'src/libraries/dropdown/Dropdown'
import PageHeader from 'src/libraries/heading/PageHeader'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import { useNavigate, useParams } from "react-router"
const UnpublishPrePrimaryResult = () => {
    const dispatch = useDispatch();
    const { SubjectId, } = useParams();

    const UnPublisheed = useSelector(
        (state: RootState) => state.UnpublishSlice.Unpublish);
      console.log("UnPublisheedd", UnPublisheed);

      const Unpublishee: IGetUnPublishResltBody = {
        "asXseedResultPublishStatusId":140,
        "asSchoolId":18,
        "asAcademic_Year_Id":53,
        "asAssessmentId":24,
        "asStandardDivisionId":1221,
        "asUnPublishReason":"kiran",
        "asIsPublished":"false",
        "asUpdatedById":455,
        "asUpdateDate":"2023-06-06"
          };
          useEffect(() => {
            dispatch(UnPublished(Unpublishee));
          }, []);
  return (
    
    <PageHeader heading='Pre-Primary Result' />
  )
}

export default UnpublishPrePrimaryResult