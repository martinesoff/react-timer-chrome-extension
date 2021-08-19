import React from 'react';

import {Button, Box, FormField, TextInput, Text} from 'grommet';
import {ShareRounded} from 'grommet-icons';

const Settings = React.forwardRef(({onOpenURL}, ref) => {
  return (
    <Box
      direction="row"
      justify="center"
      margin={{
        top: '40px',
      }}
    >
      <Box>
        <FormField label="Website">
          <TextInput ref={ref} placeholder="e.g. google.com" onKeyUp={onOpenURL} />
        </FormField>
        <Box direction="row" justify="center" align="center">
          <Text>Open in new tab and start timer</Text>
          <Button
            onClick={onOpenURL}
            icon={<ShareRounded ize="large" color="darkgreen" />}
            size="large"
            tip="Open"
          ></Button>
        </Box>
      </Box>
    </Box>
  );
});

export default Settings;
