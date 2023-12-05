"use client";
import { Button, createTheme } from "@mantine/core";
import classes from "./mCustomGlobalCss.module.css";



const theme = createTheme({
    components: {
        Button: Button.extend({
            classNames: classes,
        }),
    },
});

export default theme;