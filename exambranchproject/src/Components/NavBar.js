import { Menu } from 'antd'
import 'antd/dist/antd.css'
import { DiffOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const NavBar = ({ value }) => {
  return (
    <>
      {console.log(value, 'in navbar')}
      <Menu mode="horizontal">
        {/* <Menu.Item key="Home" icon={<HomeOutlined />}>
          Home
        </Menu.Item> */}
        <Menu.Item key="Revaluation" icon={<DiffOutlined />}>
          <Link to="/Reval">Re-evaluation</Link>
        </Menu.Item>
        <Menu.Item key="Supply" icon={<FormOutlined />}>
          <Link to="/Supply">Supplementary</Link>
        </Menu.Item>
        <Menu.Item key="Update" icon={<UploadOutlined />}>
          <Link to="/Update">Update</Link>
        </Menu.Item>
        <Menu.Item key="Logout" icon={<UploadOutlined />}>
          <Link to="/">Logout</Link>
        </Menu.Item>
      </Menu>
    </>
  )
}
export default NavBar
