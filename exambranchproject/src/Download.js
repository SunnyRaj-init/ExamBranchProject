import "antd/dist/antd.css"
import { Form, Button } from "antd"
// import NavBar from "./Components/NavBar"
import { useState } from "react"
// import Bait from "./Components/Bait"
import Axios from "axios"
import { Select } from "antd"
const { Option } = Select

const Download = () => {
  const [year, setyear] = useState(0)
  const [sem, setsem] = useState(0)
  const [clicked, setclicked] = useState(false)
  const [table, settable] = useState("")

  const handletable = (value) => {
    settable(value)
  }
  const handleyears = (value) => {
    setyear(value)
  }
  const handlesems = (value) => {
    setsem(value)
  }
  return (
    <>
      <Form
        name="download-enquiry"
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
          label="select type"
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
              <Option key={"Downloadsupply"}>Supply</Option>,
              <Option key={"Downloadreval"}>Reval</Option>,
              <Option key={"Downloadcbt"}>Cbt</Option>,
            ]}
          </Select>
        </Form.Item>

        {table !== "" && (
          <>
            <Form.Item
              label="Truncate"
              rules={[
                {
                  required: false,
                  message: "Choose",
                },
              ]}
            >
              <Button
                onClick={() => {
                  Axios.post(`http://localhost:3001/Trunc${table}`).then(
                    (resp) => {
                      if (resp.data.ans || resp.data.del) {
                        alert("Entries Truncated")
                        setclicked(false)
                      }
                    }
                  )
                }}
              >
                Clear {table}
              </Button>
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
          </>
        )}
        <Form.Item
          rules={[
            {
              required: false,
              message: "Download",
            },
          ]}
          wrapperCol={{ offset: 4, span: 16 }}
        >
          {year !== 0 && sem !== 0 && !clicked && table !== "" && (
            <Button
              type="link"
              onClick={() => {
                Axios({
                  method: "post",
                  url: `http://localhost:3001/${table}`,
                  params: { year: year, sem: sem },
                  responseType: "blob",
                  headers: {},
                })
                  .then((res) => {
                    const url = window.URL.createObjectURL(new Blob([res.data]))
                    const link = document.createElement("a")
                    link.href = url
                    link.setAttribute("download", `${table}.csv`)
                    document.body.appendChild(link)
                    link.click()
                    setclicked(true)
                    alert("file downloading")
                  })
                  .catch((error) => {
                    alert(error)
                  })
              }}
            >
              Download
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default Download
