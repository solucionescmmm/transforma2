import React from "react";

import { Drawer, Grid, Typography, Box, Button } from "@mui/material";

const NotificacionsDrawer = ({ open, toggleDrawer }) => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Drawer anchor="right" open={open} onClose={(e) => toggleDrawer(e, false)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                    <Grid container direction="row" spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                backgroundColor: "#01BAB3",
                                color: "white",
                                padding: "15px",
                            }}
                        >
                            <Typography
                                sx={{
                                    padding: "15px",
                                    marginRight: "10px",
                                    marginLeft: "35px",
                                    marginTop: "10px",
                                }}
                            >
                                <b>Notificaciones</b>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography align="center" sx={{ marginTop: "200%" }}>
                        Sin notificaciones
                    </Typography>
                </Box>

                <Box>
                    <Button disabled size="small">
                        Borrar notificaciones
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default NotificacionsDrawer;
