import { FC } from 'react';
import PropTypes from 'prop-types';
import {
  styled,
  Typography,
  Box,
  Divider,
  useTheme,
  Container
} from '@mui/material';

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
    <RootWrapper display="flex" alignItems="center">
      <Typography
        variant="h3"
        sx={{
          fontWeight: '500',
          fontSize: '25px',
          color: 'black',
          margin: 'auto',
          textShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          fontFamily: 'roboto',
         
        }}
      >
        {heading}
      </Typography>
      {subheading && (
        <Typography
          variant="subtitle2"
          sx={{
            ml: 2
          }}
        >
          {subheading}
        </Typography>
      )}
    </RootWrapper>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string
};

export default PageHeader;
