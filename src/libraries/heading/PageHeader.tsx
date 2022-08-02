import { FC } from 'react';
import PropTypes from 'prop-types';
import { styled, Typography, Box, Divider, useTheme, Container } from '@mui/material';

interface PageHeaderProps {
  heading: string;
  subheading: string;
}

const RootWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(2)};
        margin-bottom: ${theme.spacing(2)};
`
);

const PageHeader: FC<PageHeaderProps> = ({ heading, subheading }) => {
  const theme = useTheme();

  return (
    <Container sx={{mt:'-25px'}}>
      <RootWrapper display="flex" alignItems="center">
        <Typography variant="h3"
          sx={{
            fontWeight: 'bolder',
            fontSize: '29px',
            color: 'black',
            margin: 'auto',
            mt:"18px",
            fontFamily: 'roboto',
            textShadow: '7px 7px 10px grey'
          }}>{(heading)}</Typography>
        {subheading && (
          <Typography variant="subtitle2" sx={{
            ml: 2
          }}>{(subheading)}</Typography>
        )}
      </RootWrapper>
    </Container>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string
};

export default PageHeader;