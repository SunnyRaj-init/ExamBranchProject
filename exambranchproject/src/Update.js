import React, { useState } from "react"
import "antd/dist/antd.css"
import { Button, Form, Input } from "antd"
import Axios from "axios"
import { Select } from "antd"
const { Option } = Select
// import { UploadOutlined } from "@ant-design/icons"

const Update = () => {
  // const [file, setfile] = useState(null)
  const [loc, setloc] = useState("")
  const [clicked, setclicked] = useState(false)
  const [task, settask] = useState(false)
  const [year, setyear] = useState(0)
  const [sem, setsem] = useState(0)
  const [table, settable] = useState("")
  const [exyear, setexyear] = useState(0)
  const [exmonth, setexmonth] = useState(0)

  const goback = () => {
    setclicked(false)
    settask(false)
  }

  const handletable = (value) => {
    settable(value)
  }
  const handleyears = (value) => {
    setyear(value)
  }
  const handlesems = (value) => {
    setsem(value)
  }
  // const store = () => {
  //   if (file !== null) {
  //     const data = new FormData()
  //     data.append("file", file)
  //     Axios.post(`http://localhost:3001/Store${table}`, data)
  //       .then((e) => {
  //         console.log("success")
  //         setclicked(true)
  //       })
  //       .catch((e) => {
  //         console.error(e, "error")
  //       })
  //   }
  // }
  const upload = () => {
    settask(true)
    Axios.post(`http://localhost:3001/Update${table}`, {
      acyear: year,
      sem: sem,
      exyear: exyear,
      exmonth: exmonth,
      loc: loc,
    }).then((resp) => {
      if (resp.data["done"]) {
        alert("Updated")
        goback()
      }
    })
  }
  return (
    <>
      <Form
        name="upload-enquiry"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Select year"
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
          label="Select semester"
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
          label="Select type"
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
            onChange={handletable}
            disabled={clicked}
          >
            {[
              <Option key={"regular"}>Regular</Option>,
              <Option key={"supply"}>Supplementary or Reval</Option>,
              <Option key={"cbt"}>CBT</Option>,
            ]}
          </Select>
        </Form.Item>
        <Form.Item
          label="Enter exam year"
          rules={[
            {
              required: false,
              message: "Choose",
            },
          ]}
        >
          <Input
            placeholder="Please enter exam year"
            style={{ width: "45%", marginRight: "1%" }}
            disabled={clicked}
            onChange={(e) => {
              if (parseInt(e.target.value) > 2000) {
                setexyear(parseInt(e.target.value))
              } else {
                setexyear(0)
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Enter exam month"
          rules={[
            {
              required: false,
              message: "Choose",
            },
          ]}
        >
          <Input
            placeholder="Please enter exam month"
            style={{ width: "45%", marginRight: "1%" }}
            disabled={clicked}
            onChange={(e) => {
              if (
                parseInt(e.target.value) >= 1 &&
                parseInt(e.target.value) <= 12
              ) {
                setexmonth(parseInt(e.target.value))
              } else {
                setexmonth(0)
              }
            }}
          />
        </Form.Item>

        {year !== 0 &&
          sem !== 0 &&
          table !== "" &&
          exyear !== 0 &&
          exmonth !== 0 && (
            <>
              <Form.Item
                label="Folder location"
                rules={[
                  {
                    required: false,
                    message: "Choose",
                  },
                ]}
              >
                {/* <Input
                  type={"file"}
                  onChange={(e) => {
                    setfile(e.target.files[0])
                  }}
                  disabled={clicked}
                  style={{
                    width: "45%",
                    marginRight: "1%",
                    marginLeft: "25%",
                  }}
                /> */}
                <Input
                  placeholder="Please give folder location"
                  style={{ width: "45%", marginRight: "1%" }}
                  // disabled={clicked}
                  onChange={(e) => {
                    setloc(e.target.value)
                    console.log(loc)
                  }}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: false,
                    message: "Choose",
                  },
                ]}
              >
                {!task && (
                  <Button type="primary" onClick={upload}>
                    Update Database
                  </Button>
                )}
              </Form.Item>
            </>
          )}
        {/* {clicked && !task && (
          <Form.Item
            rules={[
              {
                required: false,
                message: "Choose",
              },
            ]}
          >
            <Button type="primary" onClick={upload}>
              Update Database
            </Button>
          </Form.Item>
        )} */}
      </Form>
    </>
  )
}

export default Update
