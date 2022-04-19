import "antd/dist/antd.css"
import { Form, Input, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
// import NavBar from './Components/NavBar'
import { useState } from "react"
import Bait from "./Components/Bait"

const Reval = () => {
  const [rollno, setrollno] = useState("")
  // var rollno = ""
  const [clicked, setclick] = useState(false)
  const handlerollno = (e) => {
    setrollno(e.target.value)
    // rollno = e.target.value
    console.log(e.target.value)
  }
  const gait = (event) => {
    event.preventDefault()
    if (rollno !== "") {
      // console.log(event)
      setclick(true)
    } else {
      setclick(false)
    }
  }
  return (
    <>
      {/* <NavBar value={'Reval'} /> */}
      <br />
      <Form
        name="reval-enquiry"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Hall Ticket No"
          name="rollno"
          rules={[
            {
              required: true,
              message: "Please input the Hallticket No!",
            },
          ]}
        >
          <Input onChange={handlerollno} disabled={clicked} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            onClick={gait}
            disabled={clicked}
          >
            Search
          </Button>
        </Form.Item>
      </Form>
      {clicked && <Bait />}
    </>
  )
}
export default Reval
