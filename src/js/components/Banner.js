import React from "react";
import '../../css/Banner.scss';
const logo = './src/img/logo.png';
function Banner() {
    const title = "La Maison Jungle - An Open Classroom Project";
    return (
    <div className="lmj-banner">
        <img src={logo} alt={title} className="lmj-logo"/>
        <h1 className="lmj-title">{title}</h1>
    </div>
    );
}

export default Banner