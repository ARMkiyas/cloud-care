"use client";
import { Button, createTheme } from "@mantine/core";
import classes from "./mCustomGlobalCss.module.css";



const theme = createTheme({
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
    components: {
        Button: Button.extend({
            classNames: classes,
        }),
    },
});

export default theme;