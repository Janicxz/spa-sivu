import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();

    return (
        <Typography>{t("about")}</Typography>
    );
};
export default About;