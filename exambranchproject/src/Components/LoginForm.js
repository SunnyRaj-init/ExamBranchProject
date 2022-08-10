import { Form, Input, Button, Alert } from "antd"
import "antd/dist/antd.css"
import Axios from "axios"
import { useState } from "react"

const LoginForm = ({ settoken }) => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [wrong, setwrong] = useState(false)
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        rules={[
          {
            required: true,
            message: "username empty",
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setusername(e.target.value)
          }}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        // style={{ fontSize: "16px" }}
        rules={[
          {
            required: true,
            message: "password empty",
          },
        ]}
      >
        <Input.Password
          onChange={(e) => {
            setpassword(e.target.value)
          }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            Axios.post("http://localhost:3001/Login", {
              username: username,
              password: password,
            }).then((resp) => {
              console.log(resp)
              if (resp.data["goahead"]) {
                settoken(true)
                // window.location.replace("/Supply")
              } else {
                setwrong(true)
              }
            })
          }}
        >
          Login
        </Button>
      </Form.Item>
      {wrong && (
        <Alert
          description="Invalid Credentials."
          type="warning"
          showIcon
          closable
          onClose={() => {
            setwrong(false)
          }}
        />
      )}
    </Form>
  )
}

export default LoginForm
