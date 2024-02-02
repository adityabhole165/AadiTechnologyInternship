import PropTypes from 'prop-types';
import { FC } from 'react';

import { Box, Divider, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  heading: string;
  subheading: string;
}

const RootWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(2)};
`
);

const PageHeader: FC<PageHeaderProps> = ({ heading, subheading, ...rest }) => {
  const { t }: { t: any } = useTranslation();

  return (
    <RootWrapper {...rest} className="MuiPageTitle-wrapper">
      {heading && (
        <Typography
          variant="h1"
          sx={{
            ml: 2
          }}
        >
          {t(heading)}
        </Typography>
      )}
      {subheading && (
        <Typography
          variant="subtitle2"
          sx={{
            ml: 2
          }}
        >
          {t(subheading)}
        </Typography>
      )}
      <Divider
        sx={{
          mt: 2,
          color: 'red'
        }}
      />
    </RootWrapper>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string
};

export default PageHeader;
