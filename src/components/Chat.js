import { Accordion, AccordionDetails, AccordionSummary, Box, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Chat = () => {
    const [chatText, setChatText] = useState("");

    const chatTextChange = (e) => {
        console.log("Chat text:", e.target.value);
        setChatText(e.target.value);
    };
    const chatSendMessage = (e) => {
        if (e.key == "Enter") {
            console.log("Sending message:", e.target.value);
            setChatText("");
        }
    };

    return(
    <Box>
        <Accordion defaultExpanded>
            <AccordionSummary aria-controls="chat-panel-content" id="chat-panel-header">
            <Typography>AI-Avustaja</Typography>
            </AccordionSummary>
                <AccordionDetails>
                    <Typography>Moro</Typography>
                    <Typography>Moro</Typography>
                    <Typography>Moro</Typography>
                    
                    <TextField id="chat-textfield" onKeyPress={chatSendMessage} value={chatText} variant="outlined" onChange={chatTextChange}>
                        
                    </TextField>
                </AccordionDetails>
        </Accordion>
    </Box>
    );
};

export default Chat;