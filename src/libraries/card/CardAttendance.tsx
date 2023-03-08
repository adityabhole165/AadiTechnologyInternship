import { useState } from 'react';
import { Grid, Grow, Typography } from '@mui/material';
import {
  CardDetailTopper, CardDetaiAtt
} from '../styled/AccordianStyled';
function CardAttendace({ Name,Text1}) {
 return (
    <div>
          <CardDetaiAtt>
           <CardDetailTopper>{Name}</CardDetailTopper>
           <CardDetailTopper  dangerouslySetInnerHTML={{ __html: Text1 }}></CardDetailTopper>
          </CardDetaiAtt>
    </div>
  );
}
export default CardAttendace;
