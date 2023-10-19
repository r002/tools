const csv = require('csvtojson');

const newArr = [];
csv()
.fromFile(`./output/output.csv`)
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
});