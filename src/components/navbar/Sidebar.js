import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarData from "./SidebarData";
import "./sidebar.css";

function SidebarItem({ navitem, clickCar, showSidebar }) {
  const [submenu, setSubmenu] = useState(false);
  const showSubmenu = () => setSubmenu(!submenu);

  return (
    <>
      <div
        className="sidebar-item"
        key={navitem.id}
        onClick={() => showSubmenu()}
      >
        <p className="sidebar-title">{navitem.brand}</p>
        <i className={submenu ? navitem.iconOpened : navitem.iconClosed}></i>
      </div>
      {submenu &&
        navitem.subNav.map((subitem) => {
          return (
            <Link
              key={subitem.id}
              to="/car"
              className="sidebar-subitem"
              onClick={() => {
                clickCar(subitem);
                showSidebar();
              }}
            >
              <p className="subitem-title">{subitem.title}</p>
            </Link>
          );
        })}
    </>
  );
}

function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const NavItems = () => {
    return SidebarData.map((item) => {
      return (
        <SidebarItem
          key={item.id}
          navitem={item}
          clickCar={props.clickCar}
          showSidebar={showSidebar}
        />
      );
    });
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-wrapper">
          <div className="menu-bars" onClick={() => showSidebar()}>
            <i className={sidebar ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <Link to="/">
            <h1 className="logo">Automobili</h1>
          </Link>
        </div>
      </div>
      {sidebar && (
        <nav className="sidebar-nav">
          <div className="sidebar-wrap"> {NavItems()}</div>
        </nav>
      )}
    </>
  );
}

export default Sidebar;
