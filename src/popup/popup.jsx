import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {Grommet, Button, Box} from 'grommet';

import './popup.css';
import Settings from '../components/Settings';
import Visualization from '../components/Visualization';
import Heading from '../components/UI/Heading';

const customTheme = {
  global: {
    colors: {
      brand: '#01A982',
    },
    focus: {
      border: {
        color: '#01A982',
      },
    },
  },
  select: {
    icons: {
      color: 'gray',
    },
  },
};

const App = () => {
  const [seconds, setSeconds] = React.useState('');
  const [intervalIsRunning, setIntervalIsRunning] = React.useState(false);
  const [lastRefresh, setLastRefresh] = React.useState();
  const [nextRefresh, setNextRefresh] = React.useState();

  const settingRef = useRef();

  const onOpenURLHanlder = event => {
    if (event.currentTarget.type !== 'text' || event.keyCode === 13) {
      const url = settingRef.current.value;
      chrome.tabs.create({url: `https://${url}`}, () => {
        chrome.storage.local.set({
          url,
          isRunning: true,
          nextRefresh: new Date(Date.now() + seconds * 1000),
        });
      });
    }
  };

  const stopRefreshing = () => {
    chrome.storage.local.set(
      {
        timer: 0,
        isRunning: false,
        nextRefresh: null,
        lastRefresh: null,
      },
      () => {
        setIntervalIsRunning(false);
        setLastRefresh(null);
        setNextRefresh(null);
      }
    );
  };

  const setRefreshTimes = (data, offset = 0) => {
    setNextRefresh(new Date(data.nextRefresh + offset * 1000).toLocaleTimeString('en-GB'));
    setLastRefresh(new Date(data.lastRefresh + offset * 1000).toLocaleTimeString('en-GB'));
  };

  useEffect(() => {
    chrome.storage.local.get(['url', 'isRunning', 'nextRefresh', 'lastRefresh'], res => {
      settingRef.current.value = res.url;
      setIntervalIsRunning(res.isRunning);
      if (res.nextRefresh) setRefreshTimes(res);
    });

    const intervalId = setInterval(updateTime, 500);
    updateTime();

    return () => clearInterval(intervalId);
  }, []);

  const updateTime = () => {
    chrome.storage.local.get(['timer', 'nextRefresh', 'lastRefresh'], res => {
      setSeconds(10 - res.timer);
      if (res.timer === 9) {
        setRefreshTimes(res, 1);
      }
    });
  };

  return (
    <Grommet className="App" theme={customTheme}>
      <Box direction="row" justify="center">
        <Heading>Page refresher</Heading>
      </Box>
      <Visualization
        seconds={seconds}
        lastRefresh={lastRefresh}
        nextRefresh={nextRefresh}
      ></Visualization>

      <Settings ref={settingRef} onOpenURL={onOpenURLHanlder}></Settings>

      <Box
        direction="row"
        justify="around"
        margin={{
          top: '40px',
        }}
      >
        <Button
          primary
          label="Stop"
          color="#01A982"
          size="large"
          onClick={stopRefreshing}
          disabled={!intervalIsRunning}
        ></Button>
      </Box>
    </Grommet>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
