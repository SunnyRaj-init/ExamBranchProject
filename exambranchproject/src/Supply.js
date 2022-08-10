/* eslint-disable no-labels */
/* eslint-disable eqeqeq */
import "antd/dist/antd.css"
import { Form, Input, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
// import NavBar from "./Components/NavBar"
import { useState } from "react"
// import Bait from "./Components/Bait"
import Axios from "axios"
import { Select } from "antd"
const { Option } = Select

const Supply = () => {
  const [rollno, setrollno] = useState("")
  const [basecosts, setbasecosts] = useState("")
  const [addcosts, setaddcosts] = useState("")
  const [maxcosts, setmaxcosts] = useState("")
  // var rollno = ""
  const [clicked, setclick] = useState(false)
  const [render, setrender] = useState(false)
  const [, setdata] = useState([])
  const [optsA, setoptsA] = useState([])
  const [optsB, setoptsB] = useState([])
  const [optsC, setoptsC] = useState([])
  const [optsD, setoptsD] = useState([])
  const [optsE, setoptsE] = useState([])
  const [optsF, setoptsF] = useState([])
  const [optsG, setoptsG] = useState([])
  const [optsH, setoptsH] = useState([])
  const [subsA, setsubsA] = useState([])
  const [subsB, setsubsB] = useState([])
  const [subsC, setsubsC] = useState([])
  const [subsD, setsubsD] = useState([])
  const [subsE, setsubsE] = useState([])
  const [subsF, setsubsF] = useState([])
  const [subsG, setsubsG] = useState([])
  const [subsH, setsubsH] = useState([])
  const [gen, setGen] = useState(false)
  const [reg, setReg] = useState(false)
  const goBack = () => {
    alert("REGISTERED")
    setoptsA([])
    setoptsB([])
    setoptsC([])
    setoptsD([])
    setoptsE([])
    setoptsF([])
    setoptsG([])
    setoptsH([])

    setsubsA([])
    setsubsB([])
    setsubsC([])
    setsubsD([])
    setsubsE([])
    setsubsF([])
    setsubsG([])
    setsubsH([])

    setdata([])
    setclick(false)
    setGen(false)
    setrender(false)
    setReg(false)
    // setrollno("")
    // setcosts("")
    // setMonth(0)
    // setYear(0)
  }

  const handleoptsA = (value) => {
    setsubsA(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsB = (value) => {
    setsubsB(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsC = (value) => {
    setsubsC(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsD = (value) => {
    setsubsD(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsE = (value) => {
    setsubsE(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsF = (value) => {
    setsubsF(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsG = (value) => {
    setsubsG(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const handleoptsH = (value) => {
    setsubsH(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }

  const rendlastbuttons = () => {
    if (clicked && render) {
      console.log(
        subsA,
        subsB,
        subsC,
        subsD,
        subsE,
        subsF,
        subsG,
        subsH,
        "hehehe",
        subsA == optsA
      )
      return (
        <>
          <Form.Item
            rules={[
              {
                required: false,
                message: "Print",
              },
            ]}
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Button
              type="ghost"
              size="small"
              onClick={() => {
                window.print()
                return false
              }}
            >
              Print
            </Button>
            <Button
              type="default"
              size="small"
              onClick={() => {
                Axios.post("http://localhost:3001/Registersupply", {
                  rno: rollno,
                  A: subsA,
                  B: subsB,
                  C: subsC,
                  D: subsD,
                  E: subsE,
                  F: subsF,
                  G: subsG,
                  H: subsH,
                }).then((resp) => {
                  console.log(resp)
                  if (resp.data["registered"]) {
                    setReg(true)
                    console.log("ohh")
                  }
                })
              }}
            >
              Register
            </Button>
          </Form.Item>
        </>
      )
    }
  }

  const getcost = (i) => {
    let k = [basecosts, addcosts, maxcosts]
    // eslint-disable-next-line array-callback-return
    k = k.map((e) => {
      if (!isNaN(parseInt(e))) {
        return parseInt(e)
      }
    })
    k = k.filter((e) => {
      return e !== undefined
    })
    if (k.length !== 3) {
      window.location.reload(false)
    }
    if (i == 1) {
      console.log(k, "getcost")
      if (subsA.length !== 0) {
        if (subsA.length == 1) {
          return k[0]
        } else if (subsA.length > 1 && subsA.length < 4) {
          return k[0] + k[1] * (subsA.length - 1)
        } else if (subsA.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 2) {
      if (subsB.length !== 0) {
        if (subsB.length == 1) {
          return k[0]
        } else if (subsB.length > 1 && subsB.length < 4) {
          return k[0] + k[1] * (subsB.length - 1)
        } else if (subsB.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 3) {
      if (subsC.length !== 0) {
        if (subsC.length == 1) {
          return k[0]
        } else if (subsC.length > 1 && subsC.length < 4) {
          return k[0] + k[1] * (subsC.length - 1)
        } else if (subsC.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 4) {
      if (subsD.length !== 0) {
        if (subsD.length == 1) {
          return k[0]
        } else if (subsD.length > 1 && subsD.length < 4) {
          return k[0] + k[1] * (subsD.length - 1)
        } else if (subsD.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 5) {
      if (subsE.length !== 0) {
        if (subsE.length == 1) {
          return k[0]
        } else if (subsE.length > 1 && subsE.length < 4) {
          return k[0] + k[1] * (subsE.length - 1)
        } else if (subsE.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 6) {
      if (subsF.length !== 0) {
        if (subsF.length == 1) {
          return k[0]
        } else if (subsF.length > 1 && subsF.length < 4) {
          return k[0] + k[1] * (subsF.length - 1)
        } else if (subsF.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 7) {
      if (subsG.length !== 0) {
        if (subsG.length == 1) {
          return k[0]
        } else if (subsG.length > 1 && subsG.length < 4) {
          return k[0] + k[1] * (subsG.length - 1)
        } else if (subsG.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    } else if (i == 8) {
      if (subsH.length !== 0) {
        if (subsH.length == 1) {
          return k[0]
        } else if (subsH.length > 1 && subsH.length < 4) {
          return k[0] + k[1] * (subsH.length - 1)
        } else if (subsH.length >= 4) {
          return k[2]
        }
      } else {
        return 0
      }
    }
  }

  const rend11 = () => {
    if (clicked && render) {
      return (
        <>
          <Form.Item
            label="select subjects for 1"
            rules={[
              {
                required: false,
                message: "Choose",
              },
            ]}
          >
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsA}
              disabled={optsA.length == 0 || gen}
              defaultValue={subsA}
            >
              {optsA}
            </Select>
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsB}
              disabled={optsB.length == 0 || gen}
              display={optsB.length == 0 ? "none" : ""}
              defaultValue={subsB}
            >
              {optsB}
            </Select>
            {gen && getcost(1) + getcost(2)}
          </Form.Item>

          <Form.Item
            label="select subjects for 2"
            rules={[
              {
                required: false,
                message: "Choose",
              },
            ]}
          >
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsC}
              disabled={optsC.length == 0 || gen}
              defaultValue={subsC}
            >
              {optsC}
            </Select>
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsD}
              disabled={optsD.length == 0 || gen}
              defaultValue={subsD}
            >
              {optsD}
            </Select>
            {gen && getcost(3) + getcost(4)}
          </Form.Item>

          <Form.Item
            label="select subjects for 3"
            rules={[
              {
                required: false,
                message: "Choose",
              },
            ]}
          >
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsE}
              disabled={optsE.length == 0 || gen}
              defaultValue={subsE}
            >
              {optsE}
            </Select>
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsF}
              disabled={optsF.length == 0 || gen}
              defaultValue={subsF}
            >
              {optsF}
            </Select>
            {gen && getcost(5) + getcost(6)}
          </Form.Item>
          <Form.Item
            label="select subjects for 4"
            rules={[
              {
                required: false,
                message: "Choose",
              },
            ]}
          >
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsG}
              disabled={optsG.length == 0 || gen}
              defaultValue={subsG}
            >
              {optsG}
            </Select>
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleoptsH}
              disabled={optsH.length == 0 || gen}
              defaultValue={subsH}
            >
              {optsH}
            </Select>
            {gen && getcost(7) + getcost(8)}
          </Form.Item>
          {gen && (
            <h4 style={{ marginLeft: "40%" }}>
              {" "}
              Grand total:{" "}
              {getcost(1) +
                getcost(2) +
                getcost(3) +
                getcost(4) +
                getcost(5) +
                getcost(6) +
                getcost(7) +
                getcost(8)}
            </h4>
          )}
          {!gen && (
            <div className="genstudentcopy">
              <Form.Item
                rules={[
                  {
                    required: false,
                    message: "Generate Student Copy",
                  },
                ]}
                wrapperCol={{ offset: 4, span: 16 }}
              >
                <Button
                  type="ghost"
                  onClick={() => {
                    setGen(true)
                  }}
                >
                  Generate Student Copy
                </Button>
              </Form.Item>
              <style>{`@media print{.genstudentcopy{display:none;}}`}</style>
            </div>
          )}

          {/* <Form.Item
            rules={[
              {
                required: false,
                message: "Print",
              },
            ]}
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Button
              type="ghost"
              onClick={() => {
                window.print()
                return false
              }}
            >
              Print
            </Button>
          </Form.Item> */}
        </>
      )
    }
  }

  const check = () => {
    return (
      optsA.length +
      optsB.length +
      optsC.length +
      optsD.length +
      optsE.length +
      optsF.length +
      optsG.length +
      optsH.length
    )
  }

  const init = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (Object.keys(data[i]) == "A") {
        for (
          let j = 0;
          j < data[i]["A"].length && optsA.length < data[i]["A"].length;
          j++
        ) {
          setoptsA((optsA) => [
            ...optsA,
            <Option key={data[i]["A"][j]["subcode"]}>
              {data[i]["A"][j]["subname"]}
            </Option>,
          ])
          // console.log(data[i]["A"][0]["subname"], "kiki")
          setsubsA((subsA) => [...subsA, data[i]["A"][j]["subcode"]])
        }
      }
      //1sem2
      else if (Object.keys(data[i]) == "B") {
        for (
          let j = 0;
          j < data[i]["B"].length && optsB.length < data[i]["B"].length;
          j++
        ) {
          setoptsB((optsB) => [
            ...optsB,
            <Option key={data[i]["B"][j]["subcode"]}>
              {data[i]["B"][j]["subname"]}
            </Option>,
          ])
          setsubsB((subsB) => [...subsB, data[i]["B"][j]["subcode"]])
        }
      }
      //2sem1
      else if (Object.keys(data[i]) == "C") {
        for (
          let j = 0;
          j < data[i]["C"].length && optsC.length < data[i]["C"].length;
          j++
        ) {
          setoptsC((optsC) => [
            ...optsC,
            <Option key={data[i]["C"][j]["subcode"]}>
              {data[i]["C"][j]["subname"]}
            </Option>,
          ])
          setsubsC((subsC) => [...subsC, data[i]["C"][j]["subcode"]])
        }
      }
      //2sem2
      else if (Object.keys(data[i]) == "D") {
        for (
          let j = 0;
          j < data[i]["D"].length && optsD.length < data[i]["D"].length;
          j++
        ) {
          setoptsD((optsD) => [
            ...optsD,
            <Option key={data[i]["D"][j]["subcode"]}>
              {data[i]["D"][j]["subname"]}
            </Option>,
          ])
          setsubsD((subsD) => [...subsD, data[i]["D"][j]["subcode"]])
        }
      }
      //3sem1
      else if (Object.keys(data[i]) == "E") {
        for (
          let j = 0;
          j < data[i]["E"].length && optsE.length < data[i]["E"].length;
          j++
        ) {
          setoptsE((optsE) => [
            ...optsE,
            <Option key={data[i]["E"][j]["subcode"]}>
              {data[i]["E"][j]["subname"]}
            </Option>,
          ])
          setsubsE((subsE) => [...subsE, data[i]["E"][j]["subcode"]])
        }
      }
      //3sem2
      else if (Object.keys(data[i]) == "F") {
        for (
          let j = 0;
          j < data[i]["F"].length && optsF.length < data[i]["F"].length;
          j++
        ) {
          setoptsF((optsF) => [
            ...optsF,
            <Option key={data[i]["F"][j]["subcode"]}>
              {data[i]["F"][j]["subname"]}
            </Option>,
          ])
          setsubsF((subsF) => [...subsF, data[i]["F"][j]["subcode"]])
        }
      }
      //4sem1
      else if (Object.keys(data[i]) == "G") {
        for (
          let j = 0;
          j < data[i]["G"].length && optsG.length < data[i]["G"].length;
          j++
        ) {
          setoptsG((optsG) => [
            ...optsG,
            <Option key={data[i]["G"][j]["subcode"]}>
              {data[i]["G"][j]["subname"]}
            </Option>,
          ])
          setsubsG((subsG) => [...subsG, data[i]["G"][j]["subcode"]])
        }
      }
      //4sem2
      else if (Object.keys(data[i]) == "H") {
        for (
          let j = 0;
          j < data[i]["H"].length && optsH.length < data[i]["H"].length;
          j++
        ) {
          setoptsH((optsH) => [
            ...optsH,
            <Option key={data[i]["H"][j]["subcode"]}>
              {data[i]["H"][j]["subname"]}
            </Option>,
          ])
          setsubsH((subsH) => [...subsH, data[i]["H"][j]["subcode"]])
        }
      }
    }
  }

  const supplysearch = (e) => {
    e.preventDefault()
    if (rollno !== "") {
      setclick(true)
      Axios.post("http://localhost:3001/Supplysearch", {
        rno: rollno,
        gr: "F",
      }).then((resp) => {
        console.log(resp, resp.data, resp.data.length, resp.data[0]["I"])
        if (resp.data[0]["I"] > 0) {
          setdata(resp.data)
          init(resp.data)
          if (check() === resp.data[0]["I"]) {
            setrender(true)
            setclick(true)
            console.log(optsA, optsB, optsC, optsD, optsE, optsF, optsG, optsH)
            console.log("gotem all")
          } else {
            setclick(false)
          }
        }
      })
    } else {
      setclick(false)
    }
  }
  const handlerollno = (e) => {
    setrollno(e.target.value)
    console.log(e.target.value)
  }
  const handlebasecosts = (e) => {
    setbasecosts(e.target.value)
    console.log(e.target.value, "costs")
  }
  const handleaddcosts = (e) => {
    setaddcosts(e.target.value)
    console.log(e.target.value, "addcosts")
  }
  const handlemaxcosts = (e) => {
    setmaxcosts(e.target.value)
    console.log(e.target.value, "maxcosts")
  }
  // const gait = (event) => {
  //   event.preventDefault()
  //   if (rollno !== "") {
  //     // console.log(event)
  //     setclick(true)
  //   } else {
  //     setclick(false)
  //   }
  // }

  const renderbait = () => {
    if (clicked && render) {
      return <></>
    } else if (clicked) {
      return (
        <h1>Invalid Hallticket NO or No Supplementary entrie's fee on due</h1>
      )
    }
  }

  return (
    <>
      <p style={{ color: "white" }}>
        {/* <NavBar value={"Supply"} /> */}
        <Form
          name="supple-enquiry"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div className="costs">
            <style>{`@media print{.costs{display:none;}}`}</style>
            <Form.Item
              style={{ color: "white" }}
              label="Base Cost"
              rules={[
                {
                  required: true,
                  message: "Please enter the Supply base cost!",
                },
              ]}
            >
              <Input
                onChange={handlebasecosts}
                disabled={clicked}
                size="small"
                placeholder="Please enter the Supply base cost!"
                style={{ width: "50%", marginRight: "4px" }}
              />
            </Form.Item>
            <Form.Item
              label="Additional Cost"
              rules={[
                {
                  required: true,
                  message: "Please enter the Supply additional cost!",
                },
              ]}
            >
              <Input
                onChange={handleaddcosts}
                disabled={clicked}
                size="small"
                placeholder="Please enter the Supply additional cost!"
                style={{ width: "50%", marginRight: "4px" }}
              />
            </Form.Item>
            <Form.Item
              label="Max Cost"
              rules={[
                {
                  required: true,
                  message: "Please enter the Supply max cost!",
                },
              ]}
            >
              <Input
                onChange={handlemaxcosts}
                disabled={clicked}
                size="small"
                placeholder="Please enter the Supply max cost!"
                style={{ width: "50%", marginRight: "4px" }}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Hall Ticket No"
            rules={[
              {
                required: true,
                message: "Please enter the Hallticket No!",
              },
            ]}
          >
            <Input
              onChange={handlerollno}
              disabled={clicked}
              size="small"
              style={{ width: "30%", marginRight: "4px" }}
            />
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              icon={<SearchOutlined />}
              onClick={supplysearch}
              disabled={clicked}
            >
              Search
            </Button>
          </Form.Item>
        </Form>

        {renderbait()}
        <Form
          name="supple-enquiry"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {clicked && render && rend11()}
        </Form>
        <Form
          name="supple-enquiry"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {clicked && render && gen && (
            <>
              <br />
              <br />
              <br />
              <h4>
                Student Copy {rollno} {new Date().toLocaleString()}
              </h4>
            </>
          )}

          {clicked && render && gen && rend11()}
          <div className="lbuttons">
            <style>{`@media print{.lbuttons{display:none;}}`}</style>
            {gen && clicked && render && !reg && rendlastbuttons()}
            {gen && clicked && render && reg && goBack()}
          </div>
        </Form>
      </p>
    </>
  )
}

export default Supply
