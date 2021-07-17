import React, { memo } from "react";

//Librerias
import PropTypes from "prop-types";
import { chainPropTypes } from "@material-ui/utils";
import { matchSorter } from "match-sorter";
import validator from "validator";

//Hooks
import usePersonaActiva from "../hooks/usePersonaActiva";

//Componentes de Material UI
import {
    Avatar,
    Alert,
    AlertTitle,
    Tooltip,
    IconButton,
    CircularProgress,
    TextField,
    Box,
    Autocomplete,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";

//Iconos
import { Refresh as RefreshIcon, Person as PersonIcon } from "@material-ui/icons";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

//Filtro personalizado
const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
        keys: ["strNombreCompleto", "strEmail", "strIdentificacion"],
    });

//Estilos personalizados
const dropdownPersonaActivaStyles = makeStyles((theme) => ({
    listAvatar: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

/**
 *
 * NOTE: Puede revisar la documentación al final de la hoja.
 */
const DropdownPersonaActiva = ({
    id,
    value,
    name,
    onChange,
    disabled,
    error,
    helperText,
    label,
    multiple,
    required,
}) => {
    const classes = dropdownPersonaActivaStyles();
    const { data, refreshGetData } = usePersonaActiva({ autoLoader: true });

    if (!data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress size={30} />
            </Box>
        );
    }

    if (data.error) {
        return (
            <Alert
                severity="error"
                action={
                    <IconButton
                        onClick={() => {
                            refreshGetData();
                        }}
                    >
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>{data.msg}</b>
                </AlertTitle>
                Ha ocurrido un error al obtener los datos de los colaboradores.
            </Alert>
        );
    }

    /**
     * En caso de que el valor proporcionado sea un `string` con formato `email` o un `object` sin propiedades adecuadas, el sistema automáticamente
     * lo transformara al formato adecuado.
     */
    if (value) {
        if (typeof value === "string") {
            if (
                !validator.isEmail(value, {
                    domain_specific_validation: "choucairtesting.com",
                })
            ) {
                return (
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                onClick={() => {
                                    refreshGetData();
                                }}
                            >
                                <Tooltip title="Refrescar">
                                    <RefreshIcon />
                                </Tooltip>
                            </IconButton>
                        }
                    >
                        <AlertTitle>
                            <b>El valor ingresado no es valido.</b>
                        </AlertTitle>
                        Ha ocurrido un error al obtener los datos de los colaboradores, el
                        valor predeterminado se proporcionó como un string con formato
                        email, sin embargo, el valor no es valido o no pertenece al
                        dominio choucairtesting.com, contacta con el área de TI para más
                        información.
                    </Alert>
                );
            }

            let arrFilter = data.filter((e) => e.strEmail === value);
            value = multiple ? arrFilter : arrFilter[0];
        }

        /**
         * El sistema buscara en el parametro `object`, si sus propiedades contienen un `string` con formato `email`
         * con el fin de tranformar el valor en un formato valido.
         */
        if (typeof value === "object") {
            let newValues = [];

            if (value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    const objValue = value[i];

                    if (!objValue.strNombreCompleto) {
                        let bitErrorFormato = true;

                        for (const key in objValue) {
                            if (objValue.hasOwnProperty.call(objValue, key)) {
                                const element = objValue[key];

                                if (typeof element === "string") {
                                    if (validator.isEmail(element)) {
                                        let arrFilter = data.filter(
                                            (e) => e.strEmail === element
                                        );
                                        newValues.push(arrFilter[0]);

                                        bitErrorFormato = false;
                                    }
                                }
                            }
                        }

                        if (bitErrorFormato) {
                            return (
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            onClick={() => {
                                                refreshGetData();
                                            }}
                                        >
                                            <Tooltip title="Refrescar">
                                                <RefreshIcon />
                                            </Tooltip>
                                        </IconButton>
                                    }
                                >
                                    <AlertTitle>
                                        <b>El objeto ingresado no es valido.</b>
                                    </AlertTitle>
                                    Ha ocurrido un error al obtener los datos de los
                                    colaboradores, el valor predeterminado se proporcionó
                                    como un objeto, sin embargo, una o más de sus
                                    propiedades no contienen un correo electrónico valido
                                    o no pertenecen al dominio de choucairtesting.com,
                                    contacta con el área de TI para más información.
                                </Alert>
                            );
                        }
                    }
                }

                value = newValues;
            }
        }
    }

    return (
        <Autocomplete
            id={id}
            value={value}
            onChange={onChange}
            options={data}
            clearText="Borrar"
            openText="Abrir"
            closeText="Cerrar"
            noOptionsText="Colaborador no encontrado."
            disabled={disabled}
            fullWidth
            multiple={multiple}
            renderInput={(props) => (
                <TextField
                    label={label}
                    name={name}
                    error={error}
                    required={required}
                    helperText={helperText}
                    variant="standard"
                    {...props}
                />
            )}
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) => {
                if (typeof value === "string") {
                    return option === value;
                } else {
                    return (
                        option === value ||
                        option.strEmail === value.strEmail ||
                        option.strIdentificacion === value.strIdentificacion
                    );
                }
            }}
            getOptionLabel={(option) => option.strNombreCompleto || option}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.strEmail) {
                        return (
                            <Chip
                                key={index}
                                label={option.strNombreCompleto}
                                {...getTagProps({ index })}
                            />
                        );
                    } else {
                        return <Chip label={option} {...getTagProps({ index })} />;
                    }
                })
            }
            renderOption={(props, option) => (
                <List {...props} disablePadding>
                    <ListItem>
                        <ListItemAvatar className={classes.listAvatar}>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={option.strNombreCompleto}
                            secondary={option.strEmail}
                        />
                    </ListItem>
                </List>
            )}
        />
    );
};

DropdownPersonaActiva.propTypes = {
    /**
     * Este accesorio se utiliza para ayudar a implementar la lógica de accesibilidad.
     * Si no proporciona una identificación, recurrirá a una generada aleatoriamente.
     */
    id: PropTypes.string,

    /**
     * El valor Dropdown dependera si se utiliza la propiedad `multiple`
     * 
     * En caso de que sea `false`, el valor debe ser un objeto con la información seleccionado de un colaborador.
     * 
     * @example
        {
            "strEmail": "scardonas@choucairtesting.com",
            "strIdentificacion": "1020479050",
            "strNombreCompleto": "Santiago Cardona Saldarriaga",
            "strCargo": "Analista De Soluciones",
            "strCcosto": "1101000000"
        }
     * 
     * En caso de que sea `true` el valor debe ser una matriz de objetos vacia o con propiedades
     * @example
     * []
     * 
     * @example
        [
          {
            "strEmail": "scardonas@choucairtesting.com",
            "strIdentificacion": "1020479050",
            "strNombreCompleto": "Santiago Cardona Saldarriaga",
            "strCargo": "Analista De Soluciones",
            "strCcosto": "1101000000"
           }
        ]
     */
    value: chainPropTypes(PropTypes.any, (props) => {
        if (props.multiple && props.value !== undefined && !Array.isArray(props.value)) {
            return new Error(
                [
                    "DropdownPersonaActiva: El dwopdown espera que la propiedad `value` sea una matriz o indefinido.",
                    `Sin embargo, se obtuvo el valor ${props.value}.`,
                ].join("\n")
            );
        }

        return null;
    }),

    /**
     * Este accesorio se utiliza para nombrar el componente y recibir su estado
     * Si no se proporciona, el componente lo omitira automaticamente.
     */
    name: PropTypes.string,

    /**
     * La devolución de llamada se activa cuando cambia el valor.
     *
     * @param {object} event El evento originado por el callback.
     * @param {T|T[]} value El nuevo valor del componente.
     * @param {string} reason Uno de "createOption", "selectOption", "removeOption", "blur" or "clear".
     * @param {string} [details]
     */
    onChange: PropTypes.func,

    /**
     * Si es `true`, el componente está deshabilitado.
     * @default false
     */
    disabled: PropTypes.bool,

    /**
     * La propiedad `error` le permite generar un color de error en caso de validaciones
     * Si es "verdadero", el componente se marcara automaticamente.
     * @default false
     */
    error: PropTypes.bool,

    /**
     * La propiedad `helperText` le permite generar mensajes de ayuda
     */
    helperText: PropTypes.string,

    /**
     * La propiedad `label` le permite generar una etiqueta para nombrar al componente en la pantalla
     */
    label: PropTypes.string,

    /**
     * Si la propiedad es `true`, el valor debe ser una matriz y el dropdown admitirá múltiples selecciones
     * @default false
     */
    multiple: PropTypes.bool,

    /**
     * Si es `true`, el componente sera marcado como obligatorio.
     * @default false
     */
    required: PropTypes.bool,
};

/**
 *
 * Este componente devuelve un Dropdown con el listado de las personas activas en la compañia.
 *
 * @author Santiago Cardona Saldarriaga <scardonas@choucairtesting.com>
 *
 * Debe importar el componente y usarlo de la siguiente forma
 * @example
 * <DropdownPersonaActiva {props} />
 */
export default memo(DropdownPersonaActiva);
