import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FrontPage = () => {
    const { t } = useTranslation();

    return (
        <Box textAlign={"center"}>
            <Typography variant="h2">{t("welcome")}</Typography>
            <Typography >Tekstiä tekstiä  tekstiä</Typography>
        </Box>
    );
};
export default FrontPage;