import fetch from 'node-fetch'
import { arrayChunks } from './utils.js'
import { promiseEach } from './promise-each.js'

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

async function apiKec(parent) {
  return await fetch(`https://sig.bps.go.id/rest-bridging/getwilayah?level=kecamatan&parent=${parent}`, {
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
  }).then(res => res.text())
}

console.log("============= PROVINSI ===========")
const provinces = await api('provinsi', 0)
console.log(provinces)

console.log("============= KABUPATEN ===========")
let regencies = []
await promiseEach([provinces[0]], async function(data) {
  console.log('processing kabupaten di provinsi:', data.nama_bps)
  const result = await api('kabupaten', data.kode_bps)
  console.log(result)
  regencies = regencies.concat(result)
})

console.log("============= KECAMATAN ===========")
let districts = []
await promiseEach([regencies[0]], async function(data) {
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
  subDistricts.concat(result)
})
