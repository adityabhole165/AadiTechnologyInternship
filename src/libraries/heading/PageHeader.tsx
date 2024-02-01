import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { FC } from 'react';

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  icon?: any;
}

const PageHeader: FC<PageHeaderProps> = ({ heading, subheading = '' }) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography
        variant={'h3'}
        sx={{
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          my: 0
        }}
      >
        <Box
          sx={{
            height: '3px',
            width: '10px',
            backgroundColor: (theme) => theme.palette.primary.main
          }}
        ></Box>
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
    </Box>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string
};

export default PageHeader;
