'use strict';

/**
 * @file Vitest setup file
 */

const USER = 'owner';
const APP = 'app-name';

let dataPath = '/home/' + USER + '/.config/' + APP + '/Default';

if (process.platform === 'win32') {
  dataPath = 'C:\\Users\\' + USER + '\\AppData\\Local\\' + APP + '\\Default';
}
if (process.platform === 'darwin') {
  dataPath = '/home/' + USER + '/Library/Application Support/' + APP + '/Default';
}

global.nw = {
  App: {
    dataPath
  }
};
