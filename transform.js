const decompress = require("decompress");
const fs = require('fs');
const csv = require('csvtojson');

const outputDir = './output/';

decompress("./input/inventory.zip", outputDir)
  .then((files) => {
    console.log(files);
    fs.readdir(outputDir, (err, files) => {
        files.forEach(file => {
            console.log(file);
            fs.rename(`${outputDir}/${file}`, `${outputDir}/output.csv`, function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });

            const newArr = [];
            csv()
            .fromFile(`${outputDir}/output.csv`)
            .then((arr) => {
                for(const o of arr) {
                    // console.log(o['Tag']);
                    // console.log(o['Company Name']);
                    newArr.push(
                        {
                            Tag: o['Tag'],
                            Sites: o['Site Name'].split(',').map(item => item.trim())
                        }
                    );
                }
                console.log(newArr);
                const outputFile = `${outputDir}/output.json`;
                fs.writeFile(outputFile, JSON.stringify(newArr), (err) => { if (err) throw err; });
            });

            return; // Only look at the first file that's unzipped
        });
    });

  }).catch((error) => {
    console.log(error);
  });