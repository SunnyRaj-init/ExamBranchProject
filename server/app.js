const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const app = express()
const fastcsv = require("fast-csv")
const fs = require("fs")
const csvtojson = require("csvtojson")
const multer = require("multer")
// const ws = fs.createWriteStream("bezkoder_mysql_fastcsv.csv");
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "root",
  database: "practice",
})

///updatee
let fname = ""
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "F:\\Exam Branch Portal\\temp")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage }).single("file")

///Regularr
app.post("/Storeregular", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err)
    }
    fname = req.file.originalname
    return res.status(200).send(req.file)
  })
})

app.post("/Updateregular", (req, res) => {
  // console.log(req.body)
  const acyear = req.body.acyear
  const sem = req.body.sem
  const exyear = req.body.exyear
  const exmonth = req.body.exmonth
  const loc = req.body.loc.replaceAll("\\", "\\\\")
  let filesRead = 0
  let totalFiles = 0
  console.log(loc)
  fs.readdir(loc, (err, files) => {
    if (err) {
      console.log("error" + err)
    } else {
      totalFiles = files.length
    }
  })
  // res.send({ done: true })
  fs.readdir(loc, (err, files) => {
    if (err) {
      console.log("errrrr" + err)
    } else {
      files.forEach((fname) => {
        // console.log(fname, typeof fname)
        csvtojson()
          .fromFile(`${loc}\\${fname}`)
          .then((s) => {
            // console.log(Object.keys(s[1], "SSS"))
            let subcode = Object.keys(s[0])[1].split("-")[0]
            let subname = Object.keys(s[0])[1].split("-")[1]
            let grade = Object.keys(s[0])[1]
            let count = 0
            s.forEach((e) => {
              // console.log(subcode, subname, grade, e["rollno"], e[grade])
              // console.log("grade is", e[grade])
              if (e[grade] !== "") {
                db.query(
                  `insert into studentinfo(rollno,subcode,subname,grade,acyear,sem,exyear,exmonth) values("${e["rollno"]}","${subcode}","${subname}","${e[grade]}",${acyear},${sem},${exyear},${exmonth})`,
                  (err, result) => {
                    if (result) {
                      // res.send({ err: true })
                      // console.log(result)
                      // console.log({ err: false })
                      count++
                      if (count === s.length) {
                        filesRead++
                        console.log(filesRead, " uploaded", fname)
                        if (filesRead === totalFiles) {
                          res.send({ done: true })
                        }
                      }
                    }
                  }
                )
              } else {
                count++
              }
            })
          })
      })
    }
  })
})

///////supply||Reval
app.post("/Storesupply", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err)
    }
    fname = req.file.originalname
    return res.status(200).send(req.file)
  })
})

app.post("/Updatesupply", (req, res) => {
  // console.log(req.body)
  const acyear = req.body.acyear
  const sem = req.body.sem
  const exyear = req.body.exyear
  const exmonth = req.body.exmonth
  const loc = req.body.loc.replaceAll("\\", "\\\\")
  let filesRead = 0
  let totalFiles = 0
  console.log(loc)
  fs.readdir(loc, (err, files) => {
    if (err) {
      console.log("error" + err)
    } else {
      totalFiles = files.length
    }
  })
  fs.readdir(loc, (err, files) => {
    if (err) {
      console.log("errrrr" + err)
    } else {
      files.forEach((fname) => {
        csvtojson()
          .fromFile(`${loc}\\${fname}`)
          .then((s) => {
            // console.log(Object.keys(s[1], "SSS"))
            let subcode = Object.keys(s[0])[1].split("-")[0]
            let subname = Object.keys(s[0])[1].split("-")[1]
            let grade = Object.keys(s[0])[1]
            let count = 0
            s.forEach((e) => {
              // console.log(subcode, subname, grade, e["rollno"], e[grade])
              if (e[grade] !== "") {
                db.query(
                  `update studentinfo set grade="${e[grade]}",exyear=${exyear}, exmonth=${exmonth} where rollno="${e["rollno"]}" and subcode="${subcode}"`,
                  (err, result) => {
                    if (result) {
                      // res.send({ err: true })
                      console.log(result)
                      // res.send({ err: false })
                      count++
                      if (count === s.length) {
                        filesRead++
                        console.log(filesRead, " uploaded", fname)
                        if (filesRead === totalFiles) {
                          res.send({ done: true })
                        }
                      }
                    }
                  }
                )
              } else {
                count++
              }
            })
          })
      })
    }
  })
})

//////////////////////////////////////////

////supplyy

app.post("/Registersupply", (req, res) => {
  const rno = req.body.rno
  const A = req.body.A
  const B = req.body.B
  const C = req.body.C
  const D = req.body.D
  const E = req.body.E
  const F = req.body.F
  const G = req.body.G
  const H = req.body.H
  A.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",1,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  B.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",1,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  C.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",2,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  D.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",2,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  E.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",3,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  F.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",3,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  G.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",4,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })

  H.forEach((element) => {
    db.query(
      `insert into paidsupply(rollno,subcode,acyear,acsem) values("${rno}","${element}",4,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  res.send({ registered: true })
})

app.post("/Supplysearch", (req, res) => {
  const rno = req.body.rno
  const gr = req.body.gr
  let ans = []
  let value = 0
  // db.query(
  //   `select * from studentinfo where rollno="${rno}" and grade ="${gr}"`,
  //   (err, result) => {
  //     if (err) {
  //       res.send({ err: err })
  //     } else {
  //       if (result) {
  //         res.send(result)
  //       }
  //     }
  //   }
  // )

  //1 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=1 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          // console.log(result, "1:1")
          // console.log(result, "ypyooy")
          if (result.length > 0) {
            ans.push({ A: result })
            value = value + result.length
          }
          // console.log(ans, "1:1")
        }
      }
    }
  )

  //1 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=1 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ B: result })
            value = value + result.length
          }
          // console.log(ans, "1:2")
        }
      }
    }
  )

  //2 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=2 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ C: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //2 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=2 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ D: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //3 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=3 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ E: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //3 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=3 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ F: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //4 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=4 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ G: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //4 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=4 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ H: result })
            value = value + result.length
          }
          ans.unshift({ I: value })
          console.log(ans)
          res.send(ans)
        }
      }
    }
  )
})

////// reval starts here

app.post("/Revalsearch", (req, res) => {
  const rno = req.body.rno
  const exmonth = req.body.exmonth
  const exyear = req.body.exyear
  let ans = []
  let value = 0
  // db.query(
  //   `select * from temp where rollno="${rno}" and grade ="${gr}"`,
  //   (err, result) => {
  //     if (err) {
  //       res.send({ err: err })
  //     } else {
  //       if (result) {
  //         res.send(result)
  //       }
  //     }
  //   }
  // )

  //1 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=1 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          // console.log(result, "1:1")
          // console.log(result, "ypyooy")
          if (result.length > 0) {
            ans.push({ A: result })
            value = value + result.length
          }
          // console.log(ans, "1:1")
        }
      }
    }
  )

  //1 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=1 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ B: result })
            value = value + result.length
          }
          // console.log(ans, "1:2")
        }
      }
    }
  )

  //2 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=2 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ C: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //2 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=2 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ D: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //3 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=3 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ E: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //3 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=3 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ F: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //4 sem 1
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=4 and t.sem=1 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ G: result })
            value = value + result.length
          }
        }
      }
    }
  )

  //4 sem 2
  db.query(
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode and t.rollno=p.rollno where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=4 and t.sem=2 and p.subcode is null and p.rollno is null`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result) {
          if (result.length > 0) {
            ans.push({ H: result })
            value = value + result.length
          }
          ans.unshift({ I: value })
          console.log(ans)
          res.send(ans)
        }
      }
    }
  )
})

////////reval register
app.post("/Registerreval", (req, res) => {
  const rno = req.body.rno
  const A = req.body.A
  const B = req.body.B
  const C = req.body.C
  const D = req.body.D
  const E = req.body.E
  const F = req.body.F
  const G = req.body.G
  const H = req.body.H
  A.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",1,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  B.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",1,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  C.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",2,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  D.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",2,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  E.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",3,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  F.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",3,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  G.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",4,1)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  H.forEach((element) => {
    db.query(
      `insert into paidreval(rollno,subcode,acyear,acsem) values("${rno}","${element}",4,2)`,
      (err, result) => {
        if (err) {
          res.send({ err: err })
        }
      }
    )
  })
  res.send({ registered: true })
})
///////

//////LOGIN BOII

app.post("/Login", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query(
    `select username,password from users where username="${username}" and password="${password}"`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else {
        if (result.length === 1) {
          res.send({ goahead: true })
        } else {
          res.send({ goahead: false })
        }
      }
    }
  )
})

//////////

///////DOWNLOAD SUPPLY
app.post("/Downloadsupply", (req, res) => {
  const year = req.query.year
  const sem = req.query.sem
  const ws = fs.createWriteStream("F:\\Exam Branch Portal\\op\\paidsupply.csv")
  db.query(
    `select * from paidsupply where acyear=${year} and acsem=${sem}`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      const data = JSON.parse(JSON.stringify(result))
      console.log(data)
      fastcsv
        .write(data, { headers: true })
        .on("finish", () => {
          console.log("Write to paidsupply.csv successfully!")
        })
        .pipe(ws)
        .on("close", () => {
          res.download(
            "F:\\Exam Branch Portal\\op\\paidsupply.csv",
            "paidsupply.csv"
          )
        })
    }
  )
})

/////Download reval

app.post("/Downloadreval", (req, res) => {
  const year = req.query.year
  const sem = req.query.sem
  const ws = fs.createWriteStream("F:\\Exam Branch Portal\\op\\paidreval.csv")
  db.query(
    `select * from paidreval where acyear=${year} and acsem=${sem}`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      const data = JSON.parse(JSON.stringify(result))
      console.log(data)
      fastcsv
        .write(data, { headers: true })
        .on("finish", () => {
          console.log("Write to paidreval.csv successfully!")
        })
        .pipe(ws)
        .on("close", () => {
          res.download(
            "F:\\Exam Branch Portal\\op\\paidreval.csv",
            "paidreval.csv"
          )
        })
    }
  )
})
////////////////TRUNC SUPPLY
app.post("/TruncDownloadsupply", (req, res) => {
  db.query("truncate table paidsupply", (err, result) => {
    if (result) {
      res.send({ del: true })
    } else if (err) {
      res.send({ del: false })
    }
  })
})

////////TRUNC REVAL
app.post("/TruncDownloadreval", (req, res) => {
  db.query("truncate table paidreval", (err, result) => {
    if (result) {
      res.send({ del: true })
    } else if (err) {
      res.send({ del: false })
    }
  })
})

////CBT SEARCH
app.post("/CbtSearch", (req, res) => {
  console.log(req.body)
  const acyear = req.body.acyear
  const sem = req.body.sem
  const reg = req.body.reg
  const branch = req.body.branch
  const ans = []
  db.query(
    `select t.subcode from cbtsubjects t Left join paidcbt p on t.subcode=p.subcode and p.rollno="${req.body.rno}" where t.acyear=${acyear} and t.sem=${sem} and p.subcode is null and t.regyear=${reg} and t.branch="${branch}";`,
    (err, result) => {
      if (err) {
        console.log("errr" + err)
        res.status(500).end("err")
      }
      if (result) {
        result.forEach((e) => {
          ans.push(e.subcode)
        })
      }
    }
  )
  db.query(
    `select t.subcode,t.subname from cbtsubjects t Left join paidcbt p on t.subcode=p.subcode and p.rollno="${req.body.rno}" where t.acyear=${acyear} and t.sem=${sem} and p.subcode is null and t.regyear=${reg};`,
    (err, result) => {
      if (err) {
        console.log("errr" + err)
        res.status(500).end("err")
      }
      if (result) {
        console.log(result)
        res.send({ out: result, ans })
      }
    }
  )
})

////CBT REGISTER

app.post("/CbtRegister", (req, res) => {
  const acyear = req.body.acyear
  const sem = req.body.sem
  const subcode = req.body.subcode
  const rno = req.body.rno

  let count = 0
  console.log(req.body)
  subcode.forEach((e) => {
    db.query(
      `insert into paidcbt(rollno,subcode,acyear,sem)values("${rno}","${e}","${acyear}","${sem}")`,
      (err) => {
        if (err) {
          res.status(500).send("errrr" + err)
        } else {
          count++
        }
      }
    )
  })

  res.send({ succ: true })
})

////TRUNCATE PAID CBT
app.post("/TruncDownloadcbt", (req, res) => {
  db.query("truncate paidcbt", (err, result) => {
    if (err) {
      res.status(500).send("errrr" + err)
    }
    if (result) {
      res.send({ ans: true })
    }
  })
})

////DOWNLOAD paid cbt
app.post("/Downloadcbt", (req, res) => {
  const year = req.query.year
  const sem = req.query.sem
  const ws = fs.createWriteStream("F:\\Exam Branch Portal\\op\\paidcbt.csv")
  db.query(
    `select * from paidcbt where acyear=${year} and sem=${sem}`,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      const data = JSON.parse(JSON.stringify(result))
      console.log(data)
      fastcsv
        .write(data, { headers: true })
        .on("finish", () => {
          console.log("Write to paidcbt.csv successfully!")
        })
        .pipe(ws)
        .on("close", () => {
          res.download("F:\\Exam Branch Portal\\op\\paidcbt.csv", "paidcbt.csv")
        })
    }
  )
})

////upload cbt
app.post("/Updatecbt", (req, res) => {
  const acyear = req.body.acyear
  const sem = req.body.sem
  const regyear = req.body.exyear
  const loc = req.body.loc.replaceAll("\\", "\\\\")
  let filesRead = 0
  let totalFiles = 0
  console.log(loc)
  fs.readdir(loc, (err, files) => {
    if (err) {
      console.log("error" + err)
    } else {
      totalFiles = files.length
    }
  })
  fs.readdir(loc, (err, files) => {
    if (err) {
      console.log("errrrr" + err)
    } else {
      files.forEach((fname) => {
        csvtojson()
          .fromFile(`${loc}\\${fname}`)
          .then((s) => {
            // console.log(Object.keys(s[1], "SSS"))
            let subcode = Object.keys(s[0])[0]
            let subname = Object.keys(s[0])[1]
            let branch = Object.keys(s[0])[2]
            let count = 0
            // res.send({ done: true })
            s.forEach((e) => {
              // console.log(subcode, subname, grade, e["rollno"], e[grade])
              db.query(
                `insert into cbtsubjects(subcode,subname,acyear,sem,regyear,branch) values ("${e[subcode]}","${e[subname]}",${acyear},${sem},${regyear},"${e[branch]}")`,
                (err, result) => {
                  if (result) {
                    // res.send({ err: true })
                    console.log(result)
                    // res.send({ err: false })
                    count++
                    if (count === s.length) {
                      filesRead++
                      console.log(filesRead, " uploaded")
                      if (filesRead === totalFiles) {
                        res.send({ done: true })
                      }
                    }
                  }
                }
              )
            })
          })
      })
    }
  })
})
///fetch cbtbranches
app.post("/Branch", (req, res) => {
  let branch = []
  db.query("select distinct(branch) from cbtsubjects;", (err, result) => {
    if (result) {
      result.forEach((e) => {
        branch.push(e["branch"])
      })
      console.log(branch)
      res.send(branch)
    } else if (err) {
      res.status(500).send(err)
      console.log("eerr", err)
    }
  })
})
app.listen(3001, () => {
  console.log("server running")
})
