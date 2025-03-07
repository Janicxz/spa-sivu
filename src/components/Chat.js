import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Chat component for a React website.
 * Provides a collapsible chat window that interacts with Gemini AI.
 */
const Chat = () => {
  // State variables
  const [chatText, setChatText] = useState(""); // Current text input in the chat
  const [chatLog, setChatLog] = useState([]); // Array of chat messages
  const [chatExpanded, setChatExpanded] = useState(false); // Whether the chat window is expanded
  const [chatOpacity, setChatOpacity] = useState(1); // Opacity of the chat window
  const [chatWaitingResponse, setChatWaitingResponse] = useState(false); // Block user input while waiting for a response
  const timerRef = useRef(null);  // Timer for automatic chat expansion
  const chatLogRef = useRef(null);

  const genAI = useRef(null);
  const model = useRef(null);
  const chat = useRef(null);

  const GEMINI_API_KEY = "";

  /**
   * Gets response from Gemini AI to the current chat message and updates the chat log.
   */
  const sendMessageGemini = async () => {
    console.log("Chatlog:", chatLog);
    if (chatText === "") return; // Don't send empty messages

    try {
        // Send message to Gemini
        const result = await chat.current.sendMessage(chatText);
        const response = result.response;

         // Add AI response to chat log
         setChatLog((prevChatLog) => [...prevChatLog, { role: "model", text: response.text() }]);

        setChatText(""); // Clear the input field
    } catch (error) {
      console.error("Error while retrieving gemini response:", error);
      setChatLog([
        ...chatLog,
        {
          role: "model",
          text: "AI-assistant is currently unavailable. Try again later.",
        },
      ]);
    }
    setChatWaitingResponse(false);
  };

  /**
   * Sends the current chat text to the AI and updates the chat log.
   */
  const chatSendMessage = () => {
    if (chatText === "") return; // Don't send empty messages
    // Add user message to chat log
    setChatLog((prevChatLog) => [...prevChatLog, { role: "user", text: chatText }]);
    sendMessageGemini(); // Send message to Gemini
    setChatWaitingResponse(true); // Block user input while waiting for response
  };

  /**
   * Handles the expansion/collapse of the chat window.
   */
  const onChatExpanded = (event, value) => {
    //console.log("Chat expanded:", value);
    setChatExpanded(value);
    if (timerRef.current) clearTimeout(timerRef.current); // Cancel the popup timer if user has already expanded view
  };

  /**
   * Handles changes to the chat input text.
   * @param {Event} e - The input change event.
   */
  const chatTextChange = (e) => {
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

  const initGeminiAi = () => {
    // Init gemini AI
    try {
        genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
        model.current = genAI.current.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        chat.current = model.current.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: "Hello" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "System prompt: You are a customer service AI model, respond to the customer in most helpful fashion.",
                },
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error initializing gemini AI:", error);
        setChatLog([
          ...chatLog,
          {
            role: "model",
            text: "AI-assistant is currently unavailable. Try again later.",
          },
        ]);
      }
  };

  /**
   * Effect to automatically expand the chat window after 5 seconds on initial load.
   */
  useEffect(() => {
    timerRef.current = setTimeout(() => {
       setChatExpanded(true);
    }, 5000);

    initGeminiAi();

    return () => clearTimeout(timerRef.current); // Cleanup timer on unmount
  }, []);

  /**
   * Effect to update the chat window's opacity based on its expanded state.
   */
  useEffect(() => {
    //console.log("Chat expanded:", chatExpanded);
    chatExpanded ? setChatOpacity(1) : setChatOpacity(0.8);
  }, [chatExpanded]);

  /**
   * Effect to scroll the chat window to bottom on new messages
   */
  useEffect(() =>{
    if (chatLogRef.current) {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <Box id="chatBox" position={"absolute"} right={"15px"} bottom={"15px"} sx={{ boxShadow: 5}}>
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
          <Typography>Chatbot Antti</Typography>
        </AccordionSummary>
        <AccordionDetails
          id="chat-panel-content"
          sx={{ maxHeight: "300px", overflowY: "scroll" }}
          ref={chatLogRef}
        >
          <Typography>
            Hei, Olen AI-chatbot Antti. <br />Kirjoita viestisi tähän niin vastaan
            mahdollisimman pian.
          </Typography>
          <Divider/>
          {chatLog.map((item, id) => (
            <Box key={id}>
                <Typography>
                {item.role === "user" ? "Sinä: " : "AI: "} {item.text}
                </Typography>
                <Divider/>
            </Box>
          ))}
        </AccordionDetails>
        <Box id="chatFooter"  sx={{display: "flex", m: "2px"}}>
          <TextField
            sx={{ flexGrow: 1}}
            id="chat-textfield"
            onKeyPress={onChatKeypress}
            value={chatText}
            variant="outlined"
            onChange={chatTextChange}
            disabled={chatWaitingResponse}
          />
          <Button
          
            className="chatButton"
            onClick={() => {
              chatSendMessage();
            }}
            variant="outlined"
            disabled={chatWaitingResponse}
          >
            <SendIcon />
          </Button>
        </Box>
      </Accordion>
    </Box>
  );
};

export default Chat;
