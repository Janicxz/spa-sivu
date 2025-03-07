import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <Typography variant="h2">{t("contact-us")}</Typography>
            <Typography >Tekstiä tekstiä  tekstiä</Typography>
        </Box>
    );
};
export default Contact;