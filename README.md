# nw-splasher-auto-update

WIP: A tool to automate checking for updates and downloading newer versions.

This is an idea I've had for a long time, but never had a reason to implement. So we'd need a proof of concept to verify it can work. I'd also like feedback from others in the community on the API.

The idea is your user downloads your app, but it only contains NW.js and a splash screen file that runs the code seen below. This code then downloads a zip file containing your `package.nw` folder contents, including any `node_modules` to a folder in appData. Then a new window is launched pointing to a file in the extracted appData folder, and setting that folder as the current working directory. I'm assuming that would work, but have not tested yet.


## Main API

In the `splash.html` file

```js
/**
 * 1. Checks for updates
 * 2. Downloads zip and extracts it of new version if available
 * 3. Launches a window pointed to the latest version
 */
nwSplasherAutoUpdate.downloadLatestAppAndOpenWindowInBackground({
  splasher: {
    /**
     * The websocket port the splash screen window listens on. When your main app window
     * loads, it will use the same port to signal the splash screen to close itself.
     */
    port: 4443,
    /**
     * Time in ms to wait after the new window is launched before auto-closing
     * splash screen if a signal is not recieved to close sooner. Send -1 to
     * only close if signaled via the websocket port.
     */
    closeSplashAfter: 3000
  },
  autoUpdate: {
    /**
     * NW.js Splasher Auto Update will make a network request to the versionUrl,
     * then pass the response into this callback function for you to use to provide
     * the URL to download the latest version.
     */
    versionUrl: 'https://example.com/versions.json',
    /**
     * Check if the latest remote version is newer than the latest local version.
     * If a new version is available, return the new version number to begin the
     * download/extract. If no new version exists, then return false and the latest
     * local version will be opened in a new window and the splash screen closed.
     *
     * @param  {string}  response     The network respone from versionUrl
     * @param  {string}  latestLocal  The latest downloaded version, or undefined if not present
     * @return {string}               The new version number (continue to download zip), or false (open current version)
     */
    confirmNewVersion: function (response, latestLocal) {
      response = JSON.parse(response);
      const latestRemote = response.latest.version;
      const updateAvailable = require('semver').gt(latestRemote, latestLocal);
      if (updateAvailable) {
        return latestRemote;
      }
      retrun false;
    },
    /**
     * Called after hitting the versionUrl with the response.
     * Must return a url to a ZIP file to be downloaded/extracted
     *
     * @param  {string} response  The response body from the network request
     * @return {string}           A url to a ZIP file to be downloaded
     */
    downloadPath: function (response) {
      response = JSON.parse(response);
      return response.latest.downloadUrl;
    },
    // If the download or extract fails, we will retry n times before stopping
    downloadRetries: 3,
    extractRetries: 3,
    /**
     * Called when an update occurs during download/extract.
     *
     * @param  {object} update                   Object containing percents
     * @param  {number} update.downloadProgress  The download progress percent
     * @param  {number} update.extractProgress   The extract progress percent
     */
    onUpdate: function ({ downloadProgress, extractProgress }) {
      if (downloadProgress) {
        console.log('Download progress: ' + downloadProgress + '%');
      }
      if (extractProgress) {
        console.log('Unzipping: ' + downloadProgress + '%');
      }
    },
    /**
     * Optional function. You can run any code to validate
     * that the downloaded zip matches expecations.
     * If it does return true. If you return false, then
     * nwSplasherAutoUpdate will retry or stop running.
     *
     * @param  {string}  pathToZip  File path to the downloaded zip file
     * @return {Boolean}            true = continue, false = retry/stop
     */
    validateZip: function (pathToZip) {
      return true;
    },
    /**
     * Optional function. You can run any code to validate
     * that the files extracted from the zip match your
     * expecations. If they do return true. If you return false,
     * then nwSplasherAutoUpdate will retry or stop running.
     *
     * @param  {string}  pathToExtract  File path to the downloaded zip file
     * @return {Boolean}                true = continue, false = retry/stop
     */
    validateExtract: function (pathToExtract) {
      return true;
    },
    /**
     * When download or extract fails, but we haven't
     * exhausted all retries yet, this is called.
     *
     * @param {string} message  Human readable warning message
     */
    onRetry: function (message) {
      console.log(message);
    }
    /**
     * Called when an error is encountered that ended execution
     * prematurely. Such as failing to download or extract after
     * all retries were exhausted.
     *
     * @param {string} errorMessage  Human readable error message
     * @param {object} err           Detailed error information if available
     */
    onError: function (errorMessage, err) {
      console.log(errorMessage, err);
    },
    /**
     * Called just prior to opening the new window
     * and closing the splash screen.
     */
    onComplete: function () {
      console.log('Finished');
    }
  },
  newWindow: {
    // The file from the extracted zip to load in the new window
    entry: 'index.html',
    // Any NW.js window subfield options: docs.nwjs.io/en/latest/References/Manifest%20Format/#window-subfields
    window: {
      min_width: 400,
      min_height: 250
    }
  }
});
```

In your main window that is displayed after the auto-update

```js
nwSplasherAutoUpdate.setCurrentWorkingDirectory();
nwSplasherAutoUpdate.closeSplashAndShowApp({
  // Must match the port number used in the splash.html
  port: 4443
});
```


## Utilities

Deleting old cache

```js
/**
 * This will delete all old zip files and extracted files except for the latest version.
 */
nwSplasherAutoUpdate.deletePastVersions({
    /**
     * Called when any errors are encountered during deletion.
     *
     * @param {string} errorMessage  Human readable error message
     * @param {object} err           Detailed error information if available
     */
    onError: function (errorMessage, err) {
      console.log(errorMessage, err);
    },
    /**
     * When deletion attempt finishes, whether successful or not.
     */
    onComplete: function () {
      console.log('Finished');
    }
});
```


## FAQ

Where are files stored?

```js
const path = require('path');

// Downloaded Zip files are stored like so:
path.join(nw.App.dataPath, 'nwSplasherZips', version, 'app.zip');

// Zips are extracted to this location
path.join(nw.App.dataPath, 'nwSplasherExtracts', version);
```


## Technical implementation

* Would use `nw-splasher` as a dependency
* Would use `fs-extra` to delete files
* Not sure what to use for network requests (versions.json), downloading zip (including progress updates), or extracting the zip file (including progress updates)
* We have a lot of beginner programmers. So although internally we may use async/await and promises, I'd like the API to be kept as a simple/approachable object with callbacks to be more approachable
* There are a lot of other features we might want to add in the future, like support for `.tar.gz`, `.rar`, `.7z`, etc but let's keep the scope small for now until those features are requested.


## Just the required parts of the API

```js
// Main splash screen needs versionUrl, download start confirmation, and a download path supplied
nwSplasherAutoUpdate.downloadLatestAppAndOpenWindowInBackground({
  autoUpdate: {
    versionUrl: 'https://example.com/versions.json',
    confirmNewVersion: function (response, latestLocal) {},
    downloadPath: function (response) {}
  }
});

// New window just needs this ran so it can set the current working directory.
nwSplasherAutoUpdate.setCurrentWorkingDirectory();
```


## Who is this for?

This approach isn't for everyone. If you're dependencies are tied to a specific Chromium, Node, or NW.js version, and you also need to ship the latest NW.js with your code, this approach won't work for you. Some may want to develop on the latest NW.js, and produce new releases that ship with it. However, prior releases would have older NW.js copies downloaded, which may no longer be compatible with code developed in newer versions, so the auto-updating would pull down code that wouldn't run until the user downloaded the latest full release anyway.


### Suggestions

If you can freeze the version of NW.js you use to a specific version and stay on that version for a year or more, this would limit the amount of manual testing you would need to do on different versions of NW.js. Using tools like Babel and Autoprefixer to target a specific Chromium version can help too. Though you'd need to ensure your node dependencies stay in sync with that version as well.

Some may want to encode the NW.js version in their `versionUrl`, such as:

```js
versionUrl: 'https://api.example.com/versions?nw=' + process.versions.nw
```

If they release different auto-update packages for different NW.js versions.

We suggest ALL users of this library code in some UI to convey to users when an auto-update won't work, and they'll need to download the full version from the website again. So if a user is on a 3 year old version of NW.js that you want to drop support for, there is some way of conveying that cleanly in the UI that is compatible with the older version.


### For-profit software

If you are using NW.js to create for-profit software, then this style of auto-update may not work for you. If you require authenticating a license, key, or the user, or the download requires authentication, then this "splash + download a zip" approach is likely too simple for your needs, and you should consider writing your own solution custom to your use case.
