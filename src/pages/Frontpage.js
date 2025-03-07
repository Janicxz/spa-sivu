import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FrontPage = () => {
    const { t } = useTranslation();

    return (
        <Typography>{t("welcome")}</Typography>
    );
};
export default FrontPage;