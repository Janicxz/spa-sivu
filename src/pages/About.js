import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <Typography variant="h2">{t("about")}</Typography>
            <Typography >Tekstiä tekstiä  tekstiä</Typography>
        </Box>
    );
};
export default About;