const csvtojson = require("csvtojson")
const mysql = require("mysql")

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "practice",
})

csvtojson()
  .fromFile("C:\\Users\\Sunny Raj\\Desktop\\op\\Book1.csv")
  .then((s) => {
    // console.log(Object.keys(s[1], "SSS"))
    let subcode = Object.keys(s[0])[1].split("-")[0]
    let subname = Object.keys(s[0])[1].split("-")[1]
    let grade = Object.keys(s[0])[1]
    s.forEach((e) => {
      // console.log(subcode, subname, grade, e["rollno"], e[grade])
      db.query(
        `insert into studentinfo(rollno,subcode,subname,grade,acyear,sem,exyear,exmonth) values("${e["rollno"]}","${subcode}","${subname}","${e[grade]}",2,1,1993,8)`,
        (err, result) => {
          if (err) {
            throw err
          } else if (result) {
            console.log(result)
          }
        }
      )
    })
  })
