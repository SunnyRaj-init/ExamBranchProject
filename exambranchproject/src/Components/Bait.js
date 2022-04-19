/* eslint-disable eqeqeq */
import { useState } from "react"
import { Form, Button } from "antd"
import Subjects from "./Subjects"
// import { Select } from "antd"
// const { Option } = Select
// import Axios from "axios"

const Bait = ({ data }) => {
  const [, setsubs] = useState({})
  const handleopts = (value) => {
    setsubs(value)
    console.log(`${typeof value} ${value}`)
    // console.log(data)
  }
  const testit = (e) => {
    e.preventDefault()
    console.log(
      data,
      data.length,
      Object.keys(data[0]),
      data[0]["A"].length,
      data[0]["A"][0]
    )
  }
  return (
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" onClick={testit}>
        Print
      </Button>
    </Form.Item>
    // <Form
    //   name="supple-subjects"
    //   labelCol={{
    //     span: 8,
    //   }}
    //   wrapperCol={{
    //     span: 8,
    //   }}
    //   initialValues={{
    //     remember: true,
    //   }}
    //   autoComplete="off"
    // >
    //   <br />
    //   <br />
    //   <Form.Item
    //     label="Choose subjects for 1:1"
    //     name="1:1subs"
    //     rules={[
    //       {
    //         required: false,
    //         message: "Choose",
    //       },
    //     ]}
    //   >
    //     <Subjects parentCallBack={handleopts} />
    //   </Form.Item>
    //   <br />
    //   <Form.Item
    //     wrapperCol={{
    //       offset: 8,
    //       span: 16,
    //     }}
    //   >
    //     <Button type="primary" htmlType="submit" onClick={testit}>
    //       Print
    //     </Button>
    //   </Form.Item>
    // </Form>
  )
}

export default Bait
