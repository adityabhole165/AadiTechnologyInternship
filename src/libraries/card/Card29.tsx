import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Card, Container, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Card29 = ({ data, header }) => {
  const ExpandIcon = ({ expanded }) =>
    expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  const theme = useTheme();
  const [show, setShow] = React.useState(false);
  const showDetails = (event) => {
    setShow(!show);
  };
  const [items, setItems] = useState(header);

  const onClick = (RowIndex) => () => {
    const newItems = [...items];
    setItems((current) =>
      current.map((obj, index) => {
        if (RowIndex === index) return { ...obj, expanded: !obj.expanded };
        else return { ...obj, expanded: false };
        return obj;
      })
    );
  };
  return (
    <Container>
      {items.map((OnlineExams, index) => (
        <Card sx={{ mt: 1 }} key={index}>
          <Box
            onClick={onClick(index)}
            sx={{
              display: 'flex',
              background: `${theme.colors.gradients.pink1}`,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <Typography variant="h4" sx={{ py: 1.5, mx: 1 }}>
              {OnlineExams.Name}
            </Typography>
            <Box sx={{ mx: 1 }}>
              <ExpandIcon expanded={OnlineExams.expanded} />
            </Box>
          </Box>
          {OnlineExams.expanded &&
            data
              .filter((obj) => {
                return obj.ParentId === OnlineExams.Id;
              })
              .map((markInformation, index) => (
                //   data.filter(obj => {return obj.SubjectId === markInformation.SubjectId}).map((markInformation, index) => (

                <Box
                  key={index}
                  sx={{
                    px: 1,
                    pt: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography>{markInformation.header}:</Typography>
                  <Typography>{markInformation.text}</Typography>
                </Box>
              ))}
        </Card>
      ))}
    </Container>
  );
};

export default Card29;
