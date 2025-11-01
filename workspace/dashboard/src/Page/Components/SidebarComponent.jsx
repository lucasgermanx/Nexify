import React from 'react';
import '../Style/Sidebar.css';
import logo from '../../assets/logo.png';
import icon_logo from '../../assets/icon_logo.png';
import { FaChartSimple, FaShop, FaPeopleGroup, FaPaperclip } from 'react-icons/fa6';

const SidebarComponent = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <img src={logo} width={150} className="logo" alt="Logo" />
          <img src={icon_logo} width={30} className="icon_logo" alt="Logo" />
        </li>
        <li className="active">
          <span className='icon-sidebar'>
            <FaChartSimple fontSize={20}/>
          </span>{' '}
          <span className="link-sidebar">Painel</span>
        </li>
        <li>
          <span className='icon-sidebar'>
            <FaPaperclip fontSize={20}/>
          </span>{' '}
          <span className="link-sidebar">Projetos</span>
        </li>
        <li>
          <span className='icon-sidebar'>
            <FaPeopleGroup fontSize={20}/>
          </span>{' '}
          <span className="link-sidebar">Leads</span>
        </li>
        <li>
          <span className='icon-sidebar'>
            <FaShop fontSize={20}/>
          </span>{' '}
          <span className="link-sidebar">Campanhas</span>
        </li>
        <div className="avatar-container">
          <center>
            <img
              src="https://ui-avatars.com/api/?rounded=true"
              alt="Avatar"
              className="avatar"
              width={45}
            />
            <p className="avatar-text">Example Name</p>
            <p className="avatar-text">example@gmail.com</p>
          </center>
        </div>
      </ul>
    </div>
  );
};

export default SidebarComponent;
