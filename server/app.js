const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "practice",
})
app.post("/Supplysearch", (req, res) => {
  const rno = req.body.rno
  const gr = req.body.gr
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=1 and sem=1`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=1 and sem=2`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=2 and sem=1`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=2 and sem=2`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=3 and sem=1`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=3 and sem=2`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=4 and sem=1`,
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
    `select subcode,subname from temp where rollno="${rno}" and grade ="${gr}" and acyear=4 and sem=2`,
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

app.listen(3001, () => {
  console.log("server running")
})
