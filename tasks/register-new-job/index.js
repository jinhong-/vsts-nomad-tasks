var request = require('request');
var tl = require('vsts-task-lib/task');
var fs = require('fs');

var nomadUrl = tl.getInput('nomadUrl', true);
var jobFile = tl.getPathInput('jobFile', true);

tl.debug("Registering new job");

function fail(message) {
    tl.error(`Failed with error: ${message}`);
    tl.exit(1);
}

fs.createReadStream(jobFile)
    .pipe(request.put(`${nomadUrl}/v1/jobs`))
    .on('response', (res, body) => {
        if (response.statusCode == 200) {
            tl.debug(body);
        }
        fail(res.statusMessage);
    })
    .on('error', err => {
        fail(err);
    });