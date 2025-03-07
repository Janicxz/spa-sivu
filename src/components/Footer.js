import React from "react";
import { Box, Typography } from "@mui/material";
import Chat from "./Chat";
const Footer = () => {
    return (
        <footer>
            <Chat/>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>Jani Luostarinen 2025. Made using React and Material.</Typography>
            </Box>
        </footer>
    );
}
export default Footer;