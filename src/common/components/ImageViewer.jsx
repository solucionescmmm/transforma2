import React, { Fragment, useState } from "react";
import ImgsViewer from "react-images-viewer";

import { ImageList, ImageListItem } from "@mui/material";

export const ImageViewer = ({ images }) => {
    const [state, setState] = useState({
        isOpen: false,
        currImg: 0,
    });

    const handleImageClick = (event) => {
        setState({
            isOpen: true,
            currImg: event,
        });
    };

    const handleImageClose = () => {
        setState((prevState) => ({
            ...prevState,
            isOpen: false,
        }));
    };

    const gotoNextImg = (e) => {
        setState((prevState) => ({
            ...prevState,
            currImg: prevState.currImg + 1,
        }));
    };

    const gotoPrevImg = (e) => {
        setState((prevState) => ({
            ...prevState,
            currImg: prevState.currImg - 1,
        }));
    };

    return (
        <Fragment>
            <ImageList cols={3} variant="masonry" gap={8}>
                {images.map((img, index) => (
                    <ImageListItem key={index}>
                        <img
                            alt="PICTU"
                            onClick={() => handleImageClick(index)}
                            src={img.src}
                            style={{
                                maxWidth: "100%",
                                cursor: "pointer",
                            }}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <ImgsViewer
                imgs={images}
                isOpen={state.isOpen}
                onClose={() => handleImageClose()}
                currImg={state.currImg}
                onClickPrev={gotoPrevImg}
                onClickNext={gotoNextImg}
            />
        </Fragment>
    );
};
