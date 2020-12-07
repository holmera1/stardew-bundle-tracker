import React, {useState} from "react";
import { Table, Col, Container, Form } from "react-bootstrap";
const { ipcRenderer } = window.require('electron');

export const Bundle = (props) => {

    let itemData = require('../itemData.json');

    let imageName = require(`../images/${itemData[props.bundle].img}.png`);

    const [itemState, setItemState] = useState([]);

    const handleClick = (bundle, itemIdx) => {
        ipcRenderer.send('data', bundle, itemIdx);
        let tmp = itemState;
        tmp[itemIdx] = !itemState[itemIdx];
        setItemState(tmp);
    }

    const handleItemState = async (bundle, itemIdx) => {
        let val = await ipcRenderer.invoke('get', bundle, itemIdx);
        let tmp = itemState;
        tmp[itemIdx] = val;
        setItemState(tmp);
    }

    return (
        <Container style={{ padding: "2%" }}>
            <Col sm={{ size: 10 }}>
                <div style={{marginBottom: '0px'}}>
                    <img src={imageName.default} style={{display: 'inline-block', verticalAlign: 'bottom', width: '40px', height: 'auto'}}/>
                    <p style={{display: 'inline-block', fontWeight: 'bold', fontSize: '18px', margin: '0'}}>&nbsp;{props.name} (Need {itemData[props.bundle].count})</p>
                </div>
                <Table bordered hover striped size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th style={{width: '5%', textAlign: 'center'}}>&#10003;</th>
                            <th style={{width: '15%'}}>Item</th>
                            <th>Source</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        itemData[props.bundle] ? itemData[props.bundle].items.map((item, i) => {
                            handleItemState(props.bundle, i);
                            return (
                                <tr key={i}>
                                    <th style={{width: '5%', textAlign: 'center'}}>
                                        <Form.Check type="checkbox" onClick={() => {handleClick(props.bundle, i)}} defaultChecked={itemState[i]}/>
                                    </th>
                                    <th style={{width: '15%'}}>{item.name}</th>
                                    <th>{item.source}</th>
                                </tr>
                            )
                        }) :
                        <tr>
                            <th style={{width: '5%'}}>{""}</th>
                            <th style={{width: '15%'}}>{""}</th>
                            <th>{""}</th>
                        </tr>
                    }
                        <tr>
                            <th style={{width: '5%'}}></th>
                            <th style={{width: '15%'}}>Reward</th>
                            <th>{itemData[props.bundle].reward}</th>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Container>
    );
};