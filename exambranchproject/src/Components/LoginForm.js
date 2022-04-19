import { Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'

const LoginForm = () => {
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
        name="username"
        rules={[
          {
            required: true,
            message: 'username empty',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'password empty',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="Checkboxer"
        valuePropName="checked"
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Checkbox>Remember me!</Checkbox>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Button type="primary">Submit</Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Button type="dashed">
          <Link to="/Supply">Dummy</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
