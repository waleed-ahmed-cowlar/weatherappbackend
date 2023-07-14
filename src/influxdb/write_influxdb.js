const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const url = 'http://influxdb:8086'
const token =
    'UqYKZWIZ9nKja-_d1I1KGBOXT7YbOEHg3CxN0NVupyQqHZwuGbRw6rmMHkZNhuzbGLTEH1ScnKGnnopqLzCa9A=='
const org = 'myorg'
const bucket = 'weatherbuck'

const influxDB = new InfluxDB({ url, token })
const writeApi = influxDB.getWriteApi(org, bucket)

function writeDataToInfluxDB(temp_c) {
    console.log('write data to influx')
    const point1 = new Point('weather_details').floatField(
        'temperature',
        temp_c
    )
    // .tag('max_temperature', '22')
    // .floatField('value', 24.0)
    // console.log(` ${point1}`)

    writeApi.writePoint(point1)

    /**
     * Flush pending writes and close writeApi.
     **/
    // writeApi.close().then(() => {
    //     // console.log('WRITE FINISHED')
    // })
}
module.exports = writeDataToInfluxDB
