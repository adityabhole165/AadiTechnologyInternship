import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { FC } from 'react';

interface PageHeaderProps {
  heading: string;
  subheading?: any;
  icon?: any;
}

const PageHeader: FC<PageHeaderProps> = ({ heading, subheading = '' }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant={'h3'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          my: 0
        }}
      >
        <Box
          sx={{
            height: '24px',
            width: '5px',
            backgroundColor: (theme) => theme.palette.primary.main
          }}
        ></Box>
        {heading}
      </Typography>
      {subheading && <Typography variant="subtitle2">{subheading}</Typography>}
    </Box>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string
};

export default PageHeader;
