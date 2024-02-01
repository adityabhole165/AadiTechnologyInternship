import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { RootWrapper } from '../styled/HeadingStyled';

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  icon?: any;
}

const PageHeader: FC<PageHeaderProps> = ({
  heading,
  subheading = '',
  icon
}) => {
  const theme = useTheme();

  return (
    <RootWrapper display="flex" alignItems="center" gap={1}>
      {icon && (
        <Box
          sx={{
            height: 40,
            width: 40,
            boxShadow: 3,
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant={'h3'}>{heading}</Typography>
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
