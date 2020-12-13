import React from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { Bundle } from "./bundle";
import { Reward } from "./roomReward";
const { ipcRenderer } = window.require('electron');

export const CommunityCenter = () => {

    let itemData = require('../itemData.json');

    let imageName = require('../images/game_logo.png');

    const handleClear = () => {
        ipcRenderer.send('clear');
    };

    return (
        <div>
            <Tabs className="navJustified" defaultActiveKey="crafts" id="uncontrolled-tab-example"
            transition={false} style={{borderBottom: '0px', flexDirection: 'row'}}>
                <Tab eventKey="crafts" title="Crafts Room" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.craftsRewardLink} reward={itemData["craftsReward"]} />
                    <Bundle name={"Spring Foraging Bundle"} bundle={"crafts1"}></Bundle>
                    <Bundle name={"Summer Foraging Bundle"} bundle={"crafts2"}></Bundle>
                    <Bundle name={"Fall Foraging Bundle"} bundle={"crafts3"}></Bundle>
                    <Bundle name={"Winter Foraging Bundle"} bundle={"crafts4"}></Bundle>
                    <Bundle name={"Construction Bundle"} bundle={"crafts5"}></Bundle>
                    <Bundle name={"Exotic Foraging Bundle"} bundle={"crafts6"}></Bundle>
                </Tab>
                <Tab eventKey="pantry" title="Pantry" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.pantryRewardLink} reward={itemData["pantryReward"]} />
                    <Bundle name={"Spring Crops Bundle"} bundle={"pantry1"}></Bundle>
                    <Bundle name={"Summer Crops Bundle"} bundle={"pantry2"}></Bundle>
                    <Bundle name={"Fall Crops Bundle"} bundle={"pantry3"}></Bundle>
                    <Bundle name={"Quality Crops Bundle"} bundle={"pantry4"}></Bundle>
                    <Bundle name={"Animal Bundle"} bundle={"pantry5"}></Bundle>
                    <Bundle name={"Artisan Bundle"} bundle={"pantry6"}></Bundle>
                </Tab>
                <Tab eventKey="fish" title="Fish Tank" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.fishRewardLink} reward={itemData["fishReward"]} />
                    <Bundle name={"River Fish Bundle"} bundle={"fish1"}></Bundle>
                    <Bundle name={"Lake Fish Bundle"} bundle={"fish2"}></Bundle>
                    <Bundle name={"Ocean Fish Bundle"} bundle={"fish3"} ></Bundle>
                    <Bundle name={"Night Fishing Bundle"} bundle={"fish4"}></Bundle>
                    <Bundle name={"Crab Pot Bundle"} bundle={"fish5"}></Bundle>
                    <Bundle name={"Specialty Fish Bundle"} bundle={"fish6"}></Bundle>
                </Tab>
                <Tab eventKey="boiler" title="Boiler Room" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.boilerRewardLink} reward={itemData["boilerReward"]} />
                    <Bundle name={"Blacksmith's Bundle"} bundle={"boiler1"}></Bundle>
                    <Bundle name={"Geologist's Bundle"} bundle={"boiler2"}></Bundle>
                    <Bundle name={"Adventurer's Bundle"} bundle={"boiler3"}></Bundle>
                </Tab>
                <Tab eventKey="bulletin" title="Bulletin Board" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.bulletinRewardLink} reward={itemData["bulletinReward"]} />
                    <Bundle name={"Chef's Bundle"} bundle={"board1"}></Bundle>
                    <Bundle name={"Dye Bundle"} bundle={"board2"}></Bundle>
                    <Bundle name={"Field Research Bundle"} bundle={"board3"}></Bundle>
                    <Bundle name={"Fodder Bundle"} bundle={"board4"}></Bundle>
                    <Bundle name={"Enchanter's Bundle"} bundle={"board5"}></Bundle>
                </Tab>
                <Tab eventKey="vault" title="Vault" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.vaultRewardLink} reward={itemData["vaultReward"]} />
                    <Bundle name={"2,500 Bundle"} bundle={"vault1"}></Bundle>
                    <Bundle name={"5,000 Bundle"} bundle={"vault2"}></Bundle>
                    <Bundle name={"10,000 Bundle"} bundle={"vault3"}></Bundle>
                    <Bundle name={"25,000 Bundle"} bundle={"vault4"}></Bundle>
                </Tab>
                <Tab eventKey="joja" title="Abandonded JojaMart" style={{marginLeft: '10vw', marginRight: '10vw'}}>
                    <Reward link={itemData.jojaRewardLink} reward={itemData["jojaReward"]} />
                    <Bundle name={"The Missing Bundle"} bundle={"joja"}></Bundle>
                </Tab>
            </Tabs>
            <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '40px', paddingTop: '15px'}}>
                <img src={imageName.default} alt="" style={{height: '100px', width: 'auto'}}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '40px'}}>
                <Button onClick={handleClear} variant="success" style={{display: 'inline-block', float: 'left', margin: '5px'}}>Reset All</Button>
            </div>
        </div>
    );
};