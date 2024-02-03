import { Grid, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

function CardToggle1({ ItemList, clickToggle, defaultvalue }) {
  return (
    <>
      <Grid container>
        {ItemList.map((item, i) => (
          <div key={i}>
            <Grid item xs={2}>
              <Tooltip title={item.Text}>
                <ToggleButtonGroup
                  color="primary"
                  value={defaultvalue}
                  exclusive
                  onChange={() => clickToggle(item.id)}
                  aria-label="Platform"
                >
                  <ToggleButton
                    value={item.id}
                    sx={{ width: '100px', ml: '5px' }}
                  >
                    {item.Text}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Tooltip>
            </Grid>
          </div>
        ))}
      </Grid>
    </>
  );
}

export default CardToggle1;
