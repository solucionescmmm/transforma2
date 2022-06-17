import { DatePicker, DateTimePicker } from "@mui/lab";
import { Alert, MenuItem, TextField } from "@mui/material";
import NumberFormat from "react-number-format";

const ReturnTypeInput = ({ type, label, helperText }) => {
    if (type === 1) {
        return (
            <TextField
                label={label}
                variant="standard"
                helperText={helperText}
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
                value={null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        helperText={helperText}
                        fullWidth
                    />
                )}
            />
        );
    }

    if (type === 3) {
        return (
            <DateTimePicker
                label={label}
                value={null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        helperText={helperText}
                        fullWidth
                    />
                )}
            />
        );
    }

    if (type === 4) {
        return (
            <TextField
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
                label={label}
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
