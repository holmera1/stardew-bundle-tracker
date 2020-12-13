import React from "react";

export const Reward = (props) => {
    return (
        <div style={{marginTop: '25px', marginBottom: '20px'}}>
            <span style={{backgroundColor: '#F8F5F0', fontSize: '20px', fontFamily: 'Roboto', fontWeight:'bold', padding: '6px', borderRadius: '10px', borderColor: '#DFD7CA',
            borderStyle: 'solid', borderWidth: '2px', color: '#616A6B'}}>Reward: <a href={props.link} target="_blank">{props.reward}</a></span>
        </div>
    );
}