import React, {useEffect, useState} from "react";
import { Table, Container, Form } from "react-bootstrap";
const { ipcRenderer } = window.require('electron');

export const Bundle = (props) => {

    let itemData = require('../itemData.json');

    let imageName = require(`../images/${itemData[props.bundle].img}.png`);

    const [itemState, setItemState] = useState({items: []});

    const handleClick = (event) => {
        let itemIdx = event.target.name;
        ipcRenderer.send('data', props.bundle, itemIdx);
        let tmp = itemState.items;
        tmp[itemIdx] = !itemState.items[itemIdx];
        setItemState({
            items: tmp
        });
    }

    const countItems = () => {
        let count = 0;
        for(let i = 0; i < itemState.items.length; i++) {
            if(itemState.items[i]) {
                count++;
            }
        }
        if(count > itemData[props.bundle].count) {
            return itemData[props.bundle].count;
        }
        return count;
    }

    const getDataAsync = async () => {
        let tmp = [];
        for(let i = 0; i < itemData[props.bundle].items.length; i++) {
            let result = await ipcRenderer.invoke('get', props.bundle, i);
            tmp[i] = result;
        }
        setItemState({
            items: tmp
        });
    }

    useEffect(() => {
        getDataAsync();
    }, [])
    
    return (
        <Container style={{ paddingTop: '15px', paddingBottom: '5px', marginBottom: '20px', backgroundColor: '#93C54B', borderRadius: '25px' }}>
            <div style={{paddingLeft: '5px', paddingRight: '5px'}}>
                <div style={{marginBottom: '0px'}}>
                    <img src={imageName.default} alt={''} style={{display: 'inline-block', verticalAlign: 'bottom', width: '40px', height: 'auto'}}/>
                    <p style={{display: 'inline-block', fontWeight: 'bold', fontSize: '18px', margin: '0', color: 'white'}}>
                        &nbsp;{props.name} ({countItems()}/{itemData[props.bundle].count})</p>
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
                    {itemData[props.bundle].items.map((item, i) => {
                        return (
                            <tr key={i}>
                                <th style={{width: '5%', textAlign: 'center'}}>
                                    <Form.Check name={i} type="checkbox" onChange={handleClick} checked={itemState.items[i] ? itemState.items[i] : false}/>
                                </th>
                                <th style={{width: '15%'}}><a href={item.link} target="_blank">{item.name}</a></th>
                                <th>{item.source}</th>
                            </tr>
                        )
                    })}
                        <tr>
                            <th style={{width: '5%'}}></th>
                            <th style={{width: '15%'}}>Reward</th>
                            <th>{itemData[props.bundle].reward}</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};