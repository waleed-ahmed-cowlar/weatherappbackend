const { InfluxDB } = require('@influxdata/influxdb-client')
const url = 'http://localhost:8086'
const token =
    'XbJGJjb5j9kvAQ8vod6RINUDNhPpaCLb1tMyYyi4d31Qra136GZqSu9incVC7RFIpbJGy8XJump0HQVC_DTDOQ=='
const org = 'newOrg'

const influxDB = new InfluxDB({ url, token })

const queryApi = influxDB.getQueryApi(org)

/** To avoid SQL injection, use a string literal for the query. */
const fluxQuery =
    'from(bucket:"weatherbuck") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")'

const myQuery = async () => {
    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values)
        console.log(
            `${o._time} ${o._measurement} in (${o.max_temperature})  (${o.sensor_id}): ${o._field}=${o._value}`
        )
    }
}
influxDB
    .query('DELETE FROM temperature WHERE time > now() - 7d')
    .then(() => {
        console.log('Data deleted from InfluxDB')
    })
    .catch((error) => {
        console.error(`Error deleting data from InfluxDB: ${error}`)
    })

/** Execute a query and receive line table metadata and rows. */
myQuery()
