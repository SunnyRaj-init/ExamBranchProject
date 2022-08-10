import { Button, Form, Input, Select } from "antd"
import React, { useEffect } from "react"
import { useState } from "react"
import Axios from "axios"
import { useRef } from "react"

const Cbt = () => {
  const branches = useRef([])
  const [branch, setbranch] = useState([])
  const [rollno, setrollno] = useState("")
  const [basecosts, setbasecosts] = useState("")
  const [addcosts, setaddcosts] = useState("")
  const [maxcosts, setmaxcosts] = useState("")
  const [opts, setopts] = useState([])
  const [subs, setsubs] = useState([])
  const [data, setdata] = useState(0)
  const [gen, setgen] = useState(false)
  const [render, setrender] = useState(false)
  const [reg, setreg] = useState(false)
  const [regyear, setregyear] = useState(0)
  const { Option } = Select
  // var rollno = ""
  const [year, setyear] = useState(0)
  const [sem, setsem] = useState(0)
  const [clicked, setclick] = useState(false)
  useEffect(() => {
    console.log("Exucute useEffect")
    Axios.post("http://localhost:3001/Branch").then((res) => {
      res.data.forEach((e) => {
        setbranch((b) => [...b, <Option key={e}>{e}</Option>])
      })
      // console.log(branches.current)
    })
  }, [])
  const handleopts = (opts) => {
    setsubs(opts)
  }
  const handlebranch = (e) => {
    branches.current = e
    // console.log(e)
    console.log(branches.current)
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
  const handleyears = (value) => {
    setyear(value)
  }
  const handlesems = (value) => {
    setsem(value)
  }

  const calc = () => {
    if (subs.length > 0) {
      if (subs.length === 1) {
        return <h4> GrandTotal is {basecosts}</h4>
      } else if (subs.length === 5) {
        return (
          <h4>
            {" "}
            <br />
            GrandTotal is {maxcosts}
          </h4>
        )
      } else {
        if (!isNaN(parseInt(basecosts)) && !isNaN(parseInt(addcosts))) {
          let b = parseInt(basecosts)
          let ad = parseInt(addcosts)
          return (
            <h4>
              {" "}
              <br />
              GrandTotal is {b + ad * (subs.length - 1)}
            </h4>
          )
        }
      }
    }
  }
  const rendsubs = () => {
    if (clicked && render) {
      return (
        <>
          <Form.Item label="select subjects">
            <Select
              mode="multiple"
              size="small"
              allowClear
              style={{ width: "45%", marginRight: "1%" }}
              placeholder="Please select"
              onChange={handleopts}
              defaultValue={subs}
              disabled={gen}
            >
              {opts}
            </Select>
            {calc()}
            {!gen && (
              <Button
                type="dashed"
                onClick={() => {
                  setgen(true)
                }}
              >
                Generate Student Copy
              </Button>
            )}
          </Form.Item>
          {gen && rend11()}
        </>
      )
    }
  }

  const rend11 = () => {
    return (
      <div>
        <br />
        <br />
        <br />
        <h4 style={{ paddingLeft: "40%" }}>
          Student Copy {rollno} {new Date().toLocaleString()}
        </h4>
        <br />
        <Form.Item label="select subjects">
          <Select
            mode="multiple"
            size="small"
            allowClear
            style={{ width: "45%", marginRight: "1%" }}
            placeholder="Please select"
            onChange={handleopts}
            defaultValue={subs}
            disabled={true}
          >
            {opts}
          </Select>
          {calc()}
          <br />
          <br />
          {!reg && (
            <div className="lastbuttons">
              <style>{`@media print{.lastbuttons{display:none;}`}</style>
              <Button
                type="ghost"
                size="small"
                onClick={() => {
                  window.print()
                  setdata(0)
                  setgen(false)
                  setclick(false)
                  setrender(false)
                  setreg(false)
                  setopts([])
                  setsubs([])
                  return false
                }}
                style={{ marginRight: "10px" }}
              >
                Print
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setreg(true)
                  Axios.post("http://localhost:3001/CbtRegister", {
                    acyear: year,
                    sem: sem,
                    subcode: subs,
                    rno: rollno,
                  }).then((resp) => {
                    console.log(resp.data)
                    if (resp.data["succ"]) {
                      alert("REGISTERED")
                      setdata(0)
                      setgen(false)
                      setclick(false)
                      setrender(false)
                      setreg(false)
                      setopts([])
                      setsubs([])
                    }
                  })
                }}
              >
                Register
              </Button>
            </div>
          )}
        </Form.Item>
      </div>
    )
  }
  return (
    <div>
      <h5 style={{ paddingLeft: "40%" }}>CBT FORM GCET</h5>
      <Form
        name="CBt-enquiry"
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
          <style>{`@media print{.costs{display:none;}`}</style>
          <Form.Item
            label="Base Cost"
            rules={[
              {
                required: true,
                message: "Please input the CBT base cost!",
              },
            ]}
          >
            <Input
              onChange={handlebasecosts}
              disabled={clicked}
              size="small"
              placeholder="Please input the CBT base cost!"
              style={{ width: "50%", marginRight: "4px" }}
            />
          </Form.Item>
          <Form.Item
            label="Additional Cost"
            rules={[
              {
                required: true,
                message: "Please input the CBT additional cost!",
              },
            ]}
          >
            <Input
              onChange={handleaddcosts}
              disabled={clicked}
              size="small"
              placeholder="Please input the CBT max cost!"
              style={{ width: "50%", marginRight: "4px" }}
            />
          </Form.Item>
          <Form.Item
            label="Max Cost"
            rules={[
              {
                required: true,
                message: "Please input the CBT additional cost!",
              },
            ]}
          >
            <Input
              onChange={handlemaxcosts}
              disabled={clicked}
              size="small"
              placeholder="Please input the CBT max cost!"
              style={{ width: "50%", marginRight: "4px" }}
            />
          </Form.Item>
          <Form.Item
            label="Enter Regulation"
            rules={[
              {
                required: true,
                message: "Please input the Regulation year!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setregyear(e.target.value)
              }}
              disabled={clicked}
              size="small"
              placeholder="Please input Regulation year!"
              style={{ width: "50%", marginRight: "4px" }}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="select branch"
          rules={[
            {
              required: false,
              message: "Choose",
            },
          ]}
        >
          <Select
            size="middle"
            style={{ width: "45%", marginRight: "1%" }}
            placeholder="Please select branch"
            onChange={handlebranch}
            disabled={clicked}
          >
            {branch}
          </Select>
        </Form.Item>

        <Form.Item
          label="select year"
          rules={[
            {
              required: false,
              message: "Choose",
            },
          ]}
        >
          <Select
            size="middle"
            allowClear
            style={{ width: "45%", marginRight: "1%" }}
            placeholder="Please select year"
            onChange={handleyears}
            disabled={clicked}
          >
            {[
              <Option key={1}>1</Option>,
              <Option key={2}>2</Option>,
              <Option key={3}>3</Option>,
              <Option key={4}>4</Option>,
            ]}
          </Select>
        </Form.Item>
        <Form.Item
          label="select semester"
          rules={[
            {
              required: false,
              message: "Choose",
            },
          ]}
        >
          <Select
            size="middle"
            allowClear
            style={{ width: "45%", marginRight: "1%" }}
            placeholder="Please select year"
            onChange={handlesems}
            disabled={clicked}
          >
            {[<Option key={1}>1</Option>, <Option key={2}>2</Option>]}
          </Select>
        </Form.Item>
        <Form.Item
          label="Enter roll no"
          rules={[
            {
              required: true,
              message: "Please input the CBT max cost!",
            },
          ]}
        >
          <Input
            onChange={handlerollno}
            disabled={clicked}
            size="small"
            style={{ width: "30%", marginRight: "4px" }}
          />
          {rollno !== "" &&
            basecosts !== "" &&
            maxcosts !== "" &&
            addcosts !== "" &&
            year !== 0 &&
            sem !== 0 &&
            regyear > 2015 && (
              <Button
                type="primary"
                disabled={clicked}
                onClick={() => {
                  setclick(true)
                  console.log(rollno, basecosts, maxcosts, year, sem)
                  Axios.post("http://localhost:3001/CbtSearch", {
                    acyear: year,
                    sem: sem,
                    rno: rollno,
                    reg: regyear,
                    branch: branches.current,
                  }).then((resp) => {
                    // console.log("response is" + resp.data["out"][0]["subcode"])
                    console.log(resp.data["ans"])
                    if (resp.data["out"].length > 0) {
                      setdata(resp.data["out"].length)
                      setsubs(resp.data["ans"])
                      for (let i = 0; i < resp.data["out"].length; i++) {
                        setopts((opts) => [
                          ...opts,
                          <Option key={resp.data["out"][i]["subcode"]}>
                            {resp.data["out"][i]["subname"]}
                          </Option>,
                        ])
                        if (opts.length === data) {
                          setrender(true)
                        } else {
                          setrender(false)
                        }
                      }
                    } else {
                      alert("NO CBT FEE REMAINING or Check regulation year")
                      setdata(0)
                      setgen(false)
                      setclick(false)
                      setrender(false)
                      setreg(false)
                      setopts([])
                      setsubs([])
                    }
                    // setclick(false)
                  })
                }}
              >
                Search
              </Button>
            )}
        </Form.Item>
        {rendsubs()}
      </Form>
    </div>
  )
}

export default Cbt
