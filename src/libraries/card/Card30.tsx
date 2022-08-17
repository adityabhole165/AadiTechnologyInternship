import { useState } from 'react';
import {
  Card,
  Container,
  Typography,
  Box,
  CardContent,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { Styles } from 'src/assets/style/student-style';

export const Card30 = ({ header }) => {
  
  const ExpandIcon = ({ expanded }) =>
    expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  const [enableRow, setEnableRow] = useState(-1);
  const expand = (index) => {
    if (enableRow === index) setEnableRow(-1);
    else setEnableRow(index);
  };
  const classes = Styles();
  const theme = useTheme();
  return (
    <Container>
      {header.map((Header) => (
        <Card
          key={Header.Id}
          sx={{ mb: '10px' }}
          className={classes.ListStyle1}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: `${theme.colors.gradients.pink1}`
            }}
            onClick={() => expand(Header.Id)}
          >
            <Typography variant="h4" sx={{ py: 1.5, mx: 1 }}>
              {Header.Name}
            </Typography>
            <Box sx={{ mr: '5px' }}>
              <ExpandIcon expanded={Header.expanded} />
            </Box>
          </Box>
          {Header.Child.map(
            (Detail) =>
              enableRow === Header.Id && (
                <Box
                  key={Detail.Id}
                  sx={{
                    ml: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mr: '20px',
                    mb: '5px',
                    mt: '3px'
                  }}
                >
                  <Typography variant="h6">{Detail.Name}</Typography>
                  <Typography>{Detail.Value}</Typography>
                </Box>
              )
          )}
        </Card>
      ))}
    </Container>
  );
};
export default Card30;
