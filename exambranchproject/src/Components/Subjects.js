import { Select } from "antd"
import { useState } from "react"
const { Option } = Select
var i = 1

const opts = [
  <Option key={i++}>'pps'</Option>,
  <Option key={i++}>'sd'</Option>,
  <Option key={i++}> 'bee'</Option>,
  <Option key={i++}>'Eg'</Option>,
  <Option key={i++}> 'Ap'</Option>,
  <Option key={i++}> 'pps-lab'</Option>,
  <Option key={i++}>'ap-lab'</Option>,
]
const Subjects = ({ parentCallBack }) => {
  const [, setsubs] = useState({})
  const handleChange = (value) => {
    setsubs(value)
    parentCallBack(value)
    // console.log(`${typeof value} ${value}`)
  }
  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={handleChange}
      >
        {opts}
      </Select>
    </>
  )
}

export default Subjects
