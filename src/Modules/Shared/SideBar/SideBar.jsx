import React, { useContext, useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import logo from '../../../assets/3.png'
import { ContextFounder } from '../../../contexts/UserConrtrxt';
import OnlyAdmins from '../Prtected/OnlyAdmins';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const {logout} = useContext(ContextFounder);
  const onlogout = () => {
    localStorage.removeItem('token');
    logout();
  }
  return (
<>
<Sidebar collapsed={collapsed} className='rounded-top-right overflow-hidden bg-sidebar  text-sidebar border-none position-sticky top-0 vh-100 sidebar-container' >
  <div className="w-100 text-center cursor-pointer" onClick={()=>{setCollapsed(!collapsed)}}>
    <img height={80} className={collapsed ? 'hieght-small' : 'hieght-big'} src={logo} alt="logo" />
  </div>
  <Menu>
    <MenuItem icon={<i className="fas fa-home"></i>} component={<Link to="/dashboard"/>}> Home </MenuItem>
    <OnlyAdmins>
      <MenuItem icon={<i className="fas fa-users"></i>} component={<Link to="/dashboard/users"/>}> Users </MenuItem>
    </OnlyAdmins>
    <MenuItem icon={<i className="fas fa-list"></i>} component={<Link to="/dashboard/categories"/>}> Categories </MenuItem>
    <MenuItem icon={<i className="fas fa-utensils"></i>} component={<Link to="/dashboard/recipes"/>}> Recipes </MenuItem>
    <MenuItem icon={<i className="fas fa-key"></i>}> change Password </MenuItem>
    <MenuItem onClick={onlogout} icon={<i className="fas fa-sign-out-alt"></i>} component={<Link to="/login"/>}> log out </MenuItem>
  </Menu>
</Sidebar>
</>  
)
}
