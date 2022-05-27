import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Table, Container, Form } from "react-bootstrap";
import './components.css';
const { ipcRenderer } = window.require('electron');


export const Bundle = (props) => {
    const itemData = require('../itemData.json');
    const imageName = require(`../images/${itemData[props.bundle].img}.png`);
    const [itemState, setItemState] = useState({ items: [] });

    const countItems = useMemo(() => {
        const count = itemState.items.reduce((acc, curr) => curr ? ++acc : acc, 0);
        return count > itemData[props.bundle].count ? itemData[props.bundle].count : count;
    }, [itemData, itemState, props.bundle]);

    const handleClick = useCallback((event) => {
        const itemIdx = parseInt(event.target.name);
        ipcRenderer.send('data', props.bundle, itemIdx);
        setItemState({
            items: itemState.items.map((item, i) => i === itemIdx ? !item : item)
        });
    }, [itemState, props.bundle]);

    useEffect(() => {
        const getDataAsync = async () => {
            const storedItemState = await Promise.all(itemData[props.bundle].items.map(
                async (__, i) => await ipcRenderer.invoke('get', props.bundle, i)
            ));
            setItemState({
                items: storedItemState
            });
        }
        getDataAsync();
    }, [itemData, props.bundle])

    return (
        <Container id="BundleContainer">
            <div>
                <div id="BundleHeader">
                    <img id="BundleHeaderImg" src={imageName.default} alt="" />
                    <p id="BundleHeaderText">&nbsp;{props.name} ({countItems}/{itemData[props.bundle].count})</p>
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
                                        <Form.Check name={i} type="checkbox" onChange={handleClick} checked={itemState.items[i] ? itemState.items[i] : false} />
                                    </th>
                                    <th className="ItemRow"><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a></th>
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