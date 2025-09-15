// https://github.com/joliss/history-throttled/blob/main/index.ts

let delay = null
let nextPush = null
let nextReplace = null
let lastUpdate = -Infinity
let isScheduled = false

const replaceState = (state, _, url) => {
  nextReplace = [state, url]
  schedule()
}

const pushState = (state, _, url) => {
  nextPush = [state, url]
  nextReplace = null
  schedule()
}

function schedule() {
  if (isScheduled) {
    return
  }
  if (delay === null) {
    // Check if we're on Safari, either desktop or mobile.
    // https://stackoverflow.com/a/31732310
    delay = navigator.vendor === "Apple Computer, Inc." ? 310 : 52
  }
  let delta = performance.now() - lastUpdate
  if (delta >= delay) {
    doWork()
  } else {
    setTimeout(doWork, delay - delta)
    isScheduled = true
  }
}

function doWork() {
  isScheduled = false
  lastUpdate = performance.now()
  if (nextPush !== null) {
    history.pushState(nextPush[0], "", nextPush[1])
    nextPush = null
    if (nextReplace !== null) {
      schedule()
    }
  } else {
    history.replaceState(nextReplace[0], "", nextReplace[1])
    nextReplace = null
  }
}

function setDelay(newDelay) {
  delay = newDelay
}

// export { replaceState, pushState, setDelay }
