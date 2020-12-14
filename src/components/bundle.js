import React, {useEffect, useState} from "react";
import { Table, Container, Form } from "react-bootstrap";
import './components.css';
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
        <Container id="BundleContainer">
            <div>
                <div id="BundleHeader">
                    <img id="BundleHeaderImg" src={imageName.default} alt=""/>
                    <p id="BundleHeaderText">&nbsp;{props.name} ({countItems()}/{itemData[props.bundle].count})</p>
                </div>
                <Table hover bordered striped size="sm" id="Table" variant="dark">
                    <thead>
                        <tr>
                            <th className="CheckRow">&#10003;</th>
                            <th className="ItemRow">Item</th>
                            <th className="SourceRow">Source</th>
                        </tr>
                    </thead>
                    <tbody>
                    {itemData[props.bundle].items.map((item, i) => {
                        return (
                            <tr key={i}>
                                <th className="CheckRow">
                                    <Form.Check name={i} type="checkbox" onChange={handleClick} checked={itemState.items[i] ? itemState.items[i] : false}/>
                                </th>
                                <th className="ItemRow"><a href={item.link} target="_blank">{item.name}</a></th>
                                <th className="SourceRow">{item.source}</th>
                            </tr>
                        )
                    })}
                        <tr>
                            <th className="CheckRow"></th>
                            <th className="ItemRow">Reward</th>
                            <th className="SourceRow">{itemData[props.bundle].reward}</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};