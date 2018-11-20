const { exec } = require('child_process');
const agmCore = 'node_modules/@agm/core';
const newAgmCore = 'local_dependencies/@agm/core'
const platform = process.platform;
if(platform === 'win32' || platform === 'win34')
    exec('rmdir /s /q node_modules\\@agm\\core && xcopy /e /q local_dependencies\\@agm\\core\\* node_modules\\@agm\\core\\*');
else 
    exec(`rm -rf ${agmCore} && cp -r ${newAgmCore} ${agmCore}`);