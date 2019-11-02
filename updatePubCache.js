const request = require('request');
var fs = require('fs')
var filePath = './src/app/services/pubcache.service.ts';

request.get('https://api.aws.roorkee.org/dev/v1/Post/q/{"webid":"rke-dev","status":"published"}', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  else {
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/public publicCache = {};/g, `public publicCache = {"home":${JSON.stringify(body)}};`);
    
      fs.writeFile(filePath, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  }
});
