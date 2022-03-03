import React, { Fragment, useState } from "react";
import { Slideable } from "react-slideable";
import "react-slideable/dist/index.css";

import ImgsViewer from "react-images-viewer";

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
            <Slideable
                height={200}
                width={900}
                looped={false}
                swipeable={true}
                marginBetweenItems={8}
                itemsPerScrollWidth={{
                    480: 2,
                    768: 3,
                    1200: 4,
                    max: 5,
                }}
                items={images.map((img, index) => (
                    <img
                        alt="PICTU"
                        onClick={() => handleImageClick(index)}
                        src={img.src}
                        style={{
                            maxWidth: "100%",
                            cursor: "pointer",
                        }}
                        key={index}
                        loading="lazy"
                    />
                ))}
            />

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
