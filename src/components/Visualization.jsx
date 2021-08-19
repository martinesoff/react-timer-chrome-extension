import React from 'react';

import {Box, Meter, Text, Stack} from 'grommet';

const Visualization = ({seconds, lastRefresh, nextRefresh}) => {
  return (
    <>
      <Box direction="row" justify="around">
        <Box justify="center">
          <Box align="center" pad="large">
            <Stack anchor="center">
              <Meter
                type="circle"
                background="light-2"
                values={[{value: 10 * seconds, color: '#01A982'}]}
                size="xsmall"
                thickness="small"
                round={true}
              />
              <Box direction="row" align="center" pad={{bottom: 'xsmall'}}>
                <Text size="xlarge" weight="bold">
                  {seconds}
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box
        direction="row"
        justify="center"
        gap="30px"
        margin={{
          top: '10px',
        }}
      >
        <Box direction="column">
          <Text>Last refresh was at:</Text>
          <Text weight="bold" textAlign="center">
            {lastRefresh ?? 'Timer not started'}
          </Text>
        </Box>
        <Box direction="column">
          <Text>Next refresh will be at:</Text>
          <Text weight="bold" textAlign="center">
            {nextRefresh ?? 'Timer not started'}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Visualization;
