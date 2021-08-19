chrome.alarms.create('pageRefresherTimer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'pageRefresherTimer') {
    chrome.storage.local.get(['timer', 'isRunning'], async res => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;

        if (timer === 10) {
          timer = 0;
          getCurrentTab(tab => {
            chrome.tabs.reload(tab.id);
          });
        }

        chrome.storage.local.set({
          timer,
          isRunning,
          lastRefresh: Date.now(),
          nextRefresh: Date.now() + 10 * 1000,
        });
      }
    });
  }
});

chrome.storage.local.get(['timer', 'isRunning', 'url', 'lastRefresh', 'nextRefresh'], res => {
  chrome.storage.local.set({
    timer: 'timer' in res ? res.timer : 0,
    isRunning: 'isRunning' in res ? res.isRunning : false,
    url: 'url' in res ? res.url : '',
    lastRefresh: 'lastRefresh' in res ? res.lastRefresh : null,
    nextRefresh: 'nextRefresh' in res ? res.nextRefresh : null,
  });
});

function getCurrentTab(callback) {
  let queryOptions = {active: true, currentWindow: true};
  chrome.tabs.query(queryOptions, tab => callback(tab));
}
