import React from "react";
import './components.css';

export const Reward = (props) => {
    return (
        <div id="RewardContainer">
            <span id="RewardText">Reward: <a href={props.link} target="_blank">{props.reward}</a></span>
        </div>
    );
};