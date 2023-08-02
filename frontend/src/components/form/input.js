// Input
import React from "react";
import { TextField } from "@mui/material";

const Input = ({
    name,
    type = "text",
    size = "small",
    className,
    onChange,
    value,
    formik,
}) => {
    return (
        <TextField
            id={name}
            name={name}
            type={type}
            size={size}
            className={className}
            onChange={onChange}
            value={value}
            helperText={formik?.touched?.[name] && formik?.errors?.[name]}
            sx={{
                fieldset: {
                    borderColor:
                        formik?.touched?.[name] &&
                        formik?.errors?.[name] &&
                        "#f71629",
                },
            }}
            fullWidth
        />
    );
};

export default Input;
