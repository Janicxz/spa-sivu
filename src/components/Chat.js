import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Chat = () => {
    const [chatText, setChatText] = useState("");
    const [chatLog, setChatLog] = useState([]);

    const chatTextChange = (e) => {
        console.log("Chat text:", e.target.value);
        setChatText(e.target.value);
    };
    const chatSendMessage = (e) => {
        if (e.key == "Enter") {
            console.log("Sending message:", e.target.value);
            setChatText("");
            setChatLog([...chatLog, "Sinä:" + e.target.value]);
        }
    };

    return(
    <Box display={"flex"} justifyContent={"right"} position={"sticky"} >
        <Accordion defaultExpanded sx={{width: "300px"}}>
            <AccordionSummary aria-controls="chat-panel-content" id="chat-panel-header" sx={{bgcolor: "primary.main", color: "primary.contrastText"}}>
            <Typography>AI-Avustaja</Typography>
            </AccordionSummary>
                <AccordionDetails sx={{maxHeight: "300px", overflowY: "scroll"}}>
                    <Typography>Moro</Typography>
                    <Typography>Moro</Typography>
                    <Typography>Moro</Typography>
                    {chatLog.map((viesti, id) => (
                        <Typography key={id}>{viesti}</Typography>
                    ))}
                    
                </AccordionDetails>
                <TextField sx={{p: "2px"}} id="chat-textfield" onKeyPress={chatSendMessage} value={chatText} variant="outlined" onChange={chatTextChange}>
                        
                </TextField>
                <Button variant="outlined">Lähetä</Button>
        </Accordion>
    </Box>
    );
};

export default Chat;