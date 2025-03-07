import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState(false);

    const handleChange = (e, value) => {
        setSelectedTab(value);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Demosivusto OY</Typography>
                    <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
                        <Tab label={t("nav.home")} component={Link} to="/"/>
                        <Tab label={t("nav.about")} component={Link} to="/About"/>
                        <Tab label={t("nav.contact")} component={Link} to="/Contact"/>
                    </Tabs>
                    <LanguageSelect/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavBar;