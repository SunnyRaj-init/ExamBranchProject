import { Menu } from "antd"
import "antd/dist/antd.css"
import {
  DiffOutlined,
  FormOutlined,
  UploadOutlined,
  LogoutOutlined,
  DownloadOutlined,
  CopyOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
const NavBar = ({ value }) => {
  return (
    <>
      <div style={{ color: "#4f4d4d" }}>
        {console.log(value, "in navbar")}
        <Menu mode="horizontal" theme="dark">
          {/* <Menu.Item key="Home" icon={<HomeOutlined />}>
          Home
        </Menu.Item> */}
          <Menu.Item key="Revaluation" icon={<DiffOutlined />}>
            <Link to="/Reval">Re-evaluation</Link>
          </Menu.Item>
          <Menu.Item key="Supply" icon={<FormOutlined />}>
            <Link to="/Supply">Supplementary</Link>
          </Menu.Item>
          <Menu.Item key="Cbt" icon={<CopyOutlined />}>
            <Link to="/Cbt">CBT</Link>
          </Menu.Item>
          <Menu.Item key="Update" icon={<UploadOutlined />}>
            <Link to="/Update">Update</Link>
          </Menu.Item>
          <Menu.Item key="Download" icon={<DownloadOutlined />}>
            <Link to="/Download">Download</Link>
          </Menu.Item>
          <Menu.Item
            key="Logout"
            icon={<LogoutOutlined />}
            onClick={() => window.location.replace("/")}
          >
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </>
  )
}
export default NavBar
