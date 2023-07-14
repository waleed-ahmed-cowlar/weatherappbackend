const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const url = 'http://localhost:8086'
const token =
    'XbJGJjb5j9kvAQ8vod6RINUDNhPpaCLb1tMyYyi4d31Qra136GZqSu9incVC7RFIpbJGy8XJump0HQVC_DTDOQ=='
const org = 'newOrg'
const bucket = 'weatherbuck'

const influxDB = new InfluxDB({ url, token })
const writeApi = influxDB.getWriteApi(org, bucket)

function writeDataToInfluxDB(temp_c) {

    // console.log('write data to influx')
    const point1 = new Point('weather_details')
    .floatField('temperature', temp_c)
    // .tag('max_temperature', '22')
    // .floatField('value', 24.0)
// console.log(` ${point1}`)

writeApi.writePoint(point1)

/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
    // console.log('WRITE FINISHED')
})

}
module.exports=writeDataToInfluxDB