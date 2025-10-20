import React from "react";
import "./styles/Card.css";

export default function Card(props) {
    return (
        <div onClick={props.onClick} className="card">
            <img src={props.img}></img>
            <div className="card-name-container">
                <p className="card-text">{props.name}</p>
            </div>
        </div>
    );
}
