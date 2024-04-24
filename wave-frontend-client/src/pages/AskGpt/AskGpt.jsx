import {
  Box,
  IconButton,
  OutlinedInput,
  Paper,
  createTheme,
} from "@mui/material";
import React, { useState, useContext } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../AskGpt/askgpt.css";
import { getGPTResponse } from "../../api/waveApi";
import { UserNameContext } from "../../context/UserNameContext";

function AskGPT({ waveId }) {
  //const userName = "assistant";
  const { userName } = useContext(UserNameContext);
  const [userMsg, setUserMsg] = useState();
  const [requestMessage,setRequestMessage] = useState([])
  const [messages, setMessages] = useState([]);

  const handleSendMsg = async () => {
    if (userMsg.trim() != "") {
      const messageArray = [...messages,{content: userMsg, role: "user"}];
      setMessages(messageArray);// make sure that all time it appends at the end
      setUserMsg("");
      const gptResponse = await getGPTResponse(userMsg, userName, waveId,messageArray);
      setMessages(gptResponse.ripple.messages);
    }
  };

  const handleUserMsg = (e) => {
    setUserMsg(e.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          height: "15rem",
          width: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
          borderRadius: "15px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="message"
            id={message.role === "user" ? "user" : "assistant"}
          >
            <div>
              <div className="message-content last">
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Box>
      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
        <OutlinedInput
          onKeyDown={(event) => {
            event.key === "Enter" && handleSendMsg();
          }}
          sx={{ width: "100%", height: "2em" }}
          onChange={handleUserMsg}
          value={userMsg}
          endAdornment={
            <IconButton onClick={handleSendMsg}>
              <ArrowUpwardIcon />
            </IconButton>
          }
        ></OutlinedInput>
      </div>
    </div>
  );
}

export default AskGPT;
