import { Alert, MenuItem, TextField } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import NumberFormat from "react-number-format";

const ReturnTypeInput = ({
    required,
    disabled,
    type,
    label,
    helperText,
    name,
    value,
    onChange,
    error,
}) => {
    if (type === 1) {
        return (
            <TextField
                required={required}
                onChange={onChange}
                disabled={disabled}
                name={name}
                label={label}
                variant="standard"
                helperText={helperText}
                value={value}
                error={error}
                fullWidth
                select
            >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
            </TextField>
        );
    }

    if (type === 2) {
        return (
            <DatePicker
                label={label}
                value={value}
                disabled={disabled}
                onChange={(date) => onChange(date)}
                slotProps={{
                    textField: {
                        required,
                        name,
                        variant: "standard",
                        error,
                        helperText,
                        fullWidth: true,
                    },
                }}
            />
        );
    }

    if (type === 3) {
        return (
            <DateTimePicker
                label={label}
                value={value}
                disabled={disabled}
                onChange={(date) => onChange(date)}
                slotProps={{
                    textField: {
                        required,
                        name,
                        variant: "standard",
                        error,
                        helperText,
                        fullWidth: true,
                    },
                }}
            />
        );
    }

    if (type === 4) {
        return (
            <TextField
                onChange={onChange}
                required={required}
                error={error}
                name={name}
                disabled={disabled}
                value={value}
                label={label}
                type="number"
                helperText={helperText}
                fullWidth
                variant="standard"
            />
        );
    }

    if (type === 5) {
        return (
            <NumberFormat
                onValueChange={(v) => {
                    onChange(v.floatValue);
                }}
                error={error}
                disabled={disabled}
                label={label}
                name={name}
                required={required}
                value={value}
                helperText={helperText}
                customInput={TextField}
                fullWidth
                variant="standard"
                thousandSeparator={true}
                allowNegative={false}
                prefix={"$"}
            />
        );
    }

    if (type === 6) {
        return (
            <TextField
                onChange={onChange}
                disabled={disabled}
                name={name}
                value={value}
                required={required}
                label={label}
                helperText={helperText}
                fullWidth
                variant="standard"
            />
        );
    }

    return (
        <Alert severity="warning">
            Al parecer el campo seleccionado aun no se encuentra registrado en
            el sistema, por favor escala al área de TI para mayor información
        </Alert>
    );
};

export default ReturnTypeInput;
