import React, { useEffect, useState } from 'react';
import Dropdown from "react-dropdown";
import { useSelector } from 'react-redux';

import authService from '../../../Services/authService/authService'

import './custom.css';
import "react-dropdown/style.css";
import './style.css';

const onClick = () => {
  authService.logout();
  window.location.reload();
}
const options = [
  { value: 'two', label: 'Logout' }
]
const NavBar = () => {

  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await authService.getCurrentUser();
      setUserName(user.name);
    };
    getUser();

  }, []

  )
  const link = useSelector(state => state.nav.Link);
  const currentLocation = useSelector(state => state.nav.currentPage);
  const firstPart = currentLocation.substr(0, 4);
  const secondPart = currentLocation.split("/")

  return (
    <div>
      <div className="createdNav" >
        <div className="top_nav">
          <ul className=" navbar-right">
            <li className="nav-item dropdown open">
              <div>
                <h6 style={{ float: "left", marginLeft: "-1000px", marginTop: "25px" }}><a href={(currentLocation !== "Home") ? "/" : null}>{`${firstPart}`}</a><a href={(secondPart.length > 2) ? `${link}` : null}>{secondPart[1]}</a>{secondPart[2]}</h6>
                <Dropdown
                  className='dropdown'
                  controlClassName='myControlClassName'
                  menuClassName='myMenuClassName'
                  placeholderClassName='myPlaceholderClassName'
                  options={options}
                  onChange={onClick}
                  value={""}
                  onClick={onClick}
                  placeholder={userName} />
              </div>
            </li>
          </ul>
        </div>
      </div></div>
  );
}
export default NavBar;