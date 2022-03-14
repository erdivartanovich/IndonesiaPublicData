import fs from 'fs'
import fetch from 'node-fetch'
import { promiseEach } from './utils/utils.js'
import { tableTemplate, insertRecordTemplate } from './utils/sql-template.js'

async function api(level, parent) {
  const baseUrl = "https://sig.bps.go.id/rest-bridging/getwilayah"
  return fetch(`${baseUrl}?level=${level}&parent=${parent}`, {
    "credentials": "include",
    "headers": {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:98.0) Gecko/20100101 Firefox/98.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "X-Requested-With": "XMLHttpRequest",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://sig.bps.go.id/bridging-kode/index",
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json())
}


console.log("============= PROVINSI ===========")
const provinces = await api('provinsi', 0)
console.log(provinces)

console.log("============= KABUPATEN ===========")
let regencies = []
await promiseEach(provinces, async function(data) {
  console.log('processing kabupaten di provinsi:', data.nama_bps)
  const result = await api('kabupaten', data.kode_bps)
  console.log(result)
  regencies = regencies.concat(result)
})

console.log("============= KECAMATAN ===========")
let districts = []
await promiseEach(regencies, async function(data) {
  console.log('processing kecamatan di kabupaten:', data.nama_bps)
  const result = await api('kecamatan', data.kode_bps)
  console.log(result)
  districts = districts.concat(result)
})

console.log("============= DESA ===========")
let subDistricts = []
await promiseEach(districts, async function(data) {
  console.log('processing desa di kecamatan:', data.nama_bps)
  const result = await api('desa', data.kode_bps)
  console.log(result)
  subDistricts = subDistricts.concat(result)
})


/**
 * Prepare output sql file
 * */
const outputDir = './output'
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
const outputFile = './output/wilayah.sql'
const tableProvinceName = 'tbl_wilayah_provinsi'
const tableRegencyName = 'tbl_wilayah_kabupaten'
const tableDistrictName = 'tbl_wilayah_kecamatan'
const tableSubdistrictName = 'tbl_wilayah_desa'

// write output
fs.writeFileSync(outputFile, '-- ## PROVINSI ##\n')
fs.appendFileSync(outputFile, tableTemplate(tableProvinceName))
provinces.forEach(data => {
  fs.appendFileSync(outputFile, insertRecordTemplate(tableProvinceName, data))
})

fs.appendFileSync(outputFile, '\n')
fs.appendFileSync(outputFile, '-- ## KABUPATEN ##\n')
fs.appendFileSync(outputFile, tableTemplate(tableRegencyName))
regencies.forEach(data => {
  fs.appendFileSync(outputFile, insertRecordTemplate(tableRegencyName, data))
})

fs.appendFileSync(outputFile, '\n')
fs.appendFileSync(outputFile, '-- ## KECAMATAN ##\n')
fs.appendFileSync(outputFile, tableTemplate(tableDistrictName))
districts.forEach(data => {
  fs.appendFileSync(outputFile, insertRecordTemplate(tableDistrictName, data))
})

fs.appendFileSync(outputFile, '\n')
fs.appendFileSync(outputFile, '-- ## DESA ##\n')
fs.appendFileSync(outputFile, tableTemplate(tableSubdistrictName))
subDistricts.forEach(data => {
  fs.appendFileSync(outputFile, insertRecordTemplate(tableSubdistrictName, data))
})
