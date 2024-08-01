import React from "react";
import Nadar from "../styles/images/Logo.jpg";

const Header = () => {
  return (
    <div className="container_header">
      <div className="container_img_header">
        <img src={Nadar} alt="imagen" />
      </div>
      <div className="container_title">
        <h1>PERFIL SOCIODEMOGRÁFICO</h1>
      </div>
    </div>
  );
};

export default Header;