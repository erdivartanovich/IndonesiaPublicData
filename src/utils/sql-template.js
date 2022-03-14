export function tableTemplate(tableName) {
  return `CREATE TABLE \`${tableName}\` (
        \`kode_bps\` varchar(10),
        \`nama_bps\` varchar(255),
        \`kode_dagri\` varchar(13),
        \`nama_dagri\` varchar(255)
      );\n`
}

export function insertRecordTemplate(tableName, record) {
  const { kode_bps, nama_bps, kode_dagri, nama_dagri } = record
  return `INSERT INTO \`${tableName}\` (\`kode_bps\`, \`nama_bps\`, \`kode_dagri\`, \`nama_dagri\`) VALUES ('${kode_bps}', '${nama_bps}', '${kode_dagri}', '${nama_dagri}');\n`
}
