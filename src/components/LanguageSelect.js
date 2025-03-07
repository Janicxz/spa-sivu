import { Box, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        console.log("Changing language to:", language);
    };

    return (
        <Box display="flex" justifyContent="flex-end" sx={{ml: "auto"}}>
            <IconButton onClick={() => changeLanguage("fi")}><img width="25px" src="/locale/fi.svg" alt="FI"></img></IconButton>
            <IconButton onClick={() => changeLanguage("en")}><img width="25px" src="/locale/en.svg" alt="EN"></img></IconButton>
        </Box>
    );
}

export default LanguageSelect;