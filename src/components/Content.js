import React from "react";
import { Container } from "@mui/material";

const Content = ({children}) => {
    return (
        <Container sx={{ minHeight: "80vh"}}>
            {children}
        </Container>
    );
}
export default Content;