const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const app = express()
const fastcsv = require("fast-csv")
const fs = require("fs")
// const ws = fs.createWriteStream("bezkoder_mysql_fastcsv.csv");
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "practice",
})

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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=1 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=1 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=2 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=2 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=3 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=3 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=4 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidsupply p ON t.subcode=p.subcode where t.rollno="${rno}" and t.grade ="${gr}" and t.acyear=4 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=1 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=1 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=2 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=2 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=3 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=3 and t.sem=2 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=4 and t.sem=1 and p.subcode is null`,
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
    `select t.subcode,t.subname from studentinfo t LEFT JOIN paidreval p ON t.subcode=p.subcode where t.rollno="${rno}" and t.exmonth=${exmonth} and t.exyear=${exyear} and t.acyear=4 and t.sem=2 and p.subcode is null`,
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
  const ws = fs.createWriteStream(
    "C:\\Users\\Sunny Raj\\Desktop\\op\\paidsupply.csv"
  )
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
            "C:\\Users\\Sunny Raj\\Desktop\\op\\paidsupply.csv",
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
  const ws = fs.createWriteStream(
    "C:\\Users\\Sunny Raj\\Desktop\\op\\paidreval.csv"
  )
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
            "C:\\Users\\Sunny Raj\\Desktop\\op\\paidreval.csv",
            "paidreval.csv"
          )
        })
    }
  )
})

app.listen(3001, () => {
  console.log("server running")
})
