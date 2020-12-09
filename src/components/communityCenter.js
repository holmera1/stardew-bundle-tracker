import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { Bundle } from "./bundle";
import useForceUpdate from 'use-force-update';
const { ipcRenderer } = window.require('electron');

export const CommunityCenter = (props) => {

    let itemData = require('../itemData.json');

    const forceUpdate = useForceUpdate();

    const handleClear = React.useCallback(() => {
        ipcRenderer.send('clear');
        forceUpdate();
    }, [forceUpdate]);

    useEffect(() => {
        setTimeout(
            () => forceUpdate(), 
            100
          );
    }, []);

    return (
        <div>
            <div>
                <span style={{fontSize: '38px', margin: '8px'}}>Stardew Valley Bundle Companion</span>
                <Button onClick={handleClear} variant="success" style={{display: 'inline-block', float: 'right', margin: '5px'}}>Reset</Button>
                <Tabs defaultActiveKey="crafts" id="uncontrolled-tab-example" transition={false}>
                    <Tab eventKey="crafts" title="Crafts Room">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"craftsRewardLink"} target="_blank">{itemData["craftsReward"]}</a></h4>
                        <Bundle name={"Spring Foraging Bundle"} bundle={"crafts1"}></Bundle>
                        <Bundle name={"Summer Foraging Bundle"} bundle={"crafts2"}></Bundle>
                        <Bundle name={"Fall Foraging Bundle"} bundle={"crafts3"}></Bundle>
                        <Bundle name={"Winter Foraging Bundle"} bundle={"crafts4"}></Bundle>
                        <Bundle name={"Construction Bundle"} bundle={"crafts5"}></Bundle>
                        <Bundle name={"Exotic Foraging Bundle"} bundle={"crafts6"}></Bundle>
                    </Tab>
                    <Tab eventKey="pantry" title="Pantry">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"pantryRewardLink"} target="_blank">{itemData["pantryReward"]}</a></h4>
                        <Bundle name={"Spring Crops Bundle"} bundle={"pantry1"}></Bundle>
                        <Bundle name={"Summer Crops Bundle"} bundle={"pantry2"}></Bundle>
                        <Bundle name={"Fall Crops Bundle"} bundle={"pantry3"}></Bundle>
                        <Bundle name={"Quality Crops Bundle"} bundle={"pantry4"}></Bundle>
                        <Bundle name={"Animal Bundle"} bundle={"pantry5"}></Bundle>
                        <Bundle name={"Artisan Bundle"} bundle={"pantry6"}></Bundle>
                    </Tab>
                    <Tab eventKey="fish" title="Fish Tank">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"fishRewardLink"} target="_blank">{itemData["fishReward"]}</a></h4>
                        <Bundle name={"River Fish Bundle"} bundle={"fish1"}></Bundle>
                        <Bundle name={"Lake Fish Bundle"} bundle={"fish2"}></Bundle>
                        <Bundle name={"Ocean Fish Bundle"} bundle={"fish3"} ></Bundle>
                        <Bundle name={"Night Fishing Bundle"} bundle={"fish4"}></Bundle>
                        <Bundle name={"Crab Pot Bundle"} bundle={"fish5"}></Bundle>
                        <Bundle name={"Specialty Fish Bundle"} bundle={"fish6"}></Bundle>
                    </Tab>
                    <Tab eventKey="boiler" title="Boiler Room">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"boilerRewardLink"} target="_blank">{itemData["boilerReward"]}</a></h4>
                        <Bundle name={"Blacksmith's Bundle"} bundle={"boiler1"}></Bundle>
                        <Bundle name={"Geologist's Bundle"} bundle={"boiler2"}></Bundle>
                        <Bundle name={"Adventurer's Bundle"} bundle={"boiler3"}></Bundle>
                    </Tab>
                    <Tab eventKey="bulletin" title="Bulletin Board">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"bulletinRewardLink"} target="_blank">{itemData["bulletinReward"]}</a></h4>
                        <Bundle name={"Chef's Bundle"} bundle={"board1"}></Bundle>
                        <Bundle name={"Dye Bundle"} bundle={"board2"}></Bundle>
                        <Bundle name={"Field Research Bundle"} bundle={"board3"}></Bundle>
                        <Bundle name={"Fodder Bundle"} bundle={"board4"}></Bundle>
                        <Bundle name={"Enchanter's Bundle"} bundle={"board5"}></Bundle>
                    </Tab>
                    <Tab eventKey="vault" title="Vault">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"vaultRewardLink"} target="_blank">{itemData["vaultReward"]}</a></h4>
                        <Bundle name={"2,500 Bundle"} bundle={"vault1"}></Bundle>
                        <Bundle name={"5,000 Bundle"} bundle={"vault2"}></Bundle>
                        <Bundle name={"10,000 Bundle"} bundle={"vault3"}></Bundle>
                        <Bundle name={"25,000 Bundle"} bundle={"vault4"}></Bundle>
                    </Tab>
                    <Tab eventKey="joja" title="Abandonded JojaMart">
                        <h4 style={{marginTop: '20px', marginLeft: '20px'}}>Reward: <a href={"jojaRewardLink"} target="_blank">{itemData["jojaReward"]}</a></h4>
                        <Bundle name={"The Missing Bundle"} bundle={"joja"}></Bundle>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};
