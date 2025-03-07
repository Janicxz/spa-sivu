import { Accordion, AccordionDetails, AccordionSummary, Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SendIcon from '@mui/icons-material/Send';
import "./Chat.css";

/**
 * Chat component for a React SPA website.
 * Provides a collapsible chat window that interacts with Gemini AI.
 */
const Chat = () => {
    // State variables
    const [chatText, setChatText] = useState(""); // Current text input in the chat
    const [chatLog, setChatLog] = useState([]);  // Array of chat messages
    const [chatExpanded, setChatExpanded] = useState(false); // Whether the chat window is expanded
    const [chatOpacity, setChatOpacity] = useState(1);  // Opacity of the chat window


    
    const sendMessageGemini = (message) => {
        const API_KEY = "";
        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY
        //fetch(API_URL);

        return "bla";
    };
    /**
   * Handles changes to the chat input text.
   * @param {Event} e - The input change event.
   */
    const chatTextChange = (e) => {
        //console.log("Chat text:", e.target.value);
        setChatText(e.target.value);
    };
    /**
   * Handles keypress events in the chat input.
   * Sends the message when the Enter key is pressed.
   * @param {Event} e - The keypress event.
   */
    const onChatKeypress = (e) => {
        if (e.key === "Enter") {
            chatSendMessage();
        }
    };
    /**
     * Sends the current chat text to the AI and updates the chat log.
     */
    const chatSendMessage = () => {
        if (chatText === "") return; // Don't send empty messages
        console.log("Sending message:", chatText); 
        setChatLog([...chatLog, "Sinä:" + chatText]);
        setChatText(""); // Clear the input field
        console.log(sendMessageGemini(chatText));
         // TODO: Handle the AI response and add it to the chatLog.
    };
    /**
   * Handles the expansion/collapse of the chat window.
   * @param {Event} event - The event object.
   * @param {boolean} value - The new expanded state.
   */
    const onChatExpanded = (event, value) => {
        //console.log("Chat expanded:", value);
        setChatExpanded(value);

    }
    /**
   * Effect to automatically expand the chat window after 5 seconds on initial load.
   */
    useEffect(() => {
        const chatPopupTimer = setTimeout(() => {
            if (!chatExpanded) setChatExpanded(true);
        }, 5000);

        return () => clearTimeout(chatPopupTimer); // Cleanup timer on unmount
    }, []);
    /**
   * Effect to update the chat window's opacity based on its expanded state.
   */
    useEffect(() => {
        //console.log("Chat expanded:", chatExpanded);
        chatExpanded ? setChatOpacity(1) : setChatOpacity(0.8);
    }, [chatExpanded]);

    return(
        <Box id="chatBox" position={"absolute"} right={"15px"} bottom={"15px"}>
        <Accordion
          expanded={chatExpanded}
          onChange={onChatExpanded}
          sx={{ width: "300px", opacity: chatOpacity }}
        >
          <AccordionSummary
            aria-controls="chat-panel-content"
            id="chat-panel-header"
            sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
            expandIcon={<ArrowDropDownIcon />}
          >
            <Typography>Chatbot AI-Avustaja</Typography>
          </AccordionSummary>
          <AccordionDetails
            id="chat-panel-content"
            sx={{ maxHeight: "200px", overflowY: "scroll" }}
          >
            <Typography>
              Moi! Olen AI-Avustajasi. Kirjoita viestisi tähän niin vastaan
              mahdollisimman pian.
            </Typography>
            {chatLog.map((message, id) => (
              <Typography key={id}>{message}</Typography>
            ))}
          </AccordionDetails>
          <Box id="chatFooter">
            <TextField
              sx={{ p: "2px" }}
              id="chat-textfield"
              onKeyPress={onChatKeypress}
              value={chatText}
              variant="outlined"
              onChange={chatTextChange}
            />
            <Button
              className="chatButton"
              onClick={() => {
                chatSendMessage();
              }}
              variant="outlined"
            >
              <SendIcon />
            </Button>
          </Box>
        </Accordion>
      </Box>
    );
};

export default Chat;