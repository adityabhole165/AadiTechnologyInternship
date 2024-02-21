import ApiTwoToneIcon from '@mui/icons-material/ApiTwoTone';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';
type Props = {};

const EventOverview = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container sx={{ mt: 4 }} maxWidth={'xl'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightTwoTone />}
          >
            <Link
              to={'/extended-sidebar/landing/landing'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: (theme) => theme.palette.common.white,
                  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                }}
              >
                <ApiTwoToneIcon color="primary" />
              </IconButton>
            </Link>{' '}
            <Link
              to={'/extended-sidebar/Common/AnnualPlanner'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                sx={{ color: grey[600] }}
              >
                Annual Planner
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Events Overview
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <TextField
              size={'small'}
              fullWidth
              sx={{ minWidth: 150 }}
              select={true}
              label={'Select Standard'}
              value={''}
            >
              <MenuItem value={''}>Select Standard</MenuItem>
            </TextField>
          </Box>
          <Box>
            <TextField
              size={'small'}
              fullWidth
              sx={{ minWidth: 150 }}
              select={true}
              label={'Select Division'}
              value={''}
            >
              <MenuItem value={''}>Select Division</MenuItem>
            </TextField>
          </Box>
          <Box>
            <TextField
              size={'small'}
              fullWidth
              sx={{ minWidth: 150 }}
              select={true}
              label={'Select Year'}
              value={''}
            >
              <MenuItem value={''}>Select Year</MenuItem>
            </TextField>
          </Box>
          <Box>
            <Tooltip title={'Display All the events of the school'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[700]
                  }
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ border: `1px solid ${grey[300]}` }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box width={'100%'}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                January 1990
              </Typography>
              <Typography sx={{ color: 'text.secondary' }} variant={'h5'}>
                Monday, 1st
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant={'h4'}>Events: </Typography>
            {/* loopable */}
            <Box my={1}>
              <Divider />
            </Box>
            <Typography variant={'h5'}>1. Arts Competition</Typography>
            <Typography>For Standards: </Typography>
            <span>
              Nursery, Junior KG, Senior KG, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            </span>
            {/* loop end*/}
            {/* loopable */}
            <Box my={1}>
              <Divider />
            </Box>
            <Typography variant={'h5'}>2. Science Competition</Typography>
            <Typography>For Standards: </Typography>
            <span>
              Nursery, Junior KG, Senior KG, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            </span>
            {/* loop end*/}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default EventOverview;
