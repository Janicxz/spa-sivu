import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";

const NavBar = () => {
    const [selectedTab, setSelectedTab] = useState(false);

    const handleChange = (e, value) => {
        setSelectedTab(value);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Erkki Esimerkki</Typography>
                    <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
                        <Tab label="Home" component={Link} to="/"/>
                        <Tab label="About" component={Link} to="/About"/>
                        <Tab label="Moi" component={Link} to="/"/>
                    </Tabs>
                    <LanguageSelect/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavBar;