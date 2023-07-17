const { InfluxDB } = require('@influxdata/influxdb-client')
const url = 'http://localhost:8086'
const token =
    'UqYKZWIZ9nKja-_d1I1KGBOXT7YbOEHg3CxN0NVupyQqHZwuGbRw6rmMHkZNhuzbGLTEH1ScnKGnnopqLzCa9A=='

const org = 'neworg'

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

/** Execute a query and receive line table metadata and rows. */
myQuery()
