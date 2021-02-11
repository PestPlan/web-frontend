import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";
import ListItem from "../../atoms/listItem";
import List from "../../molecules/list";

function DeviceBoardBody({ deviceList }) {
    return deviceList.map(device => {
        const values = Object.values(device);

        return (
            <ListItem key={values[0]} id={values[0]} className="board__body">
                <List
                    className="board-row"
                    items={values}
                    itemProps={{ className: "board-element" }}
                />
            </ListItem>
        );
    });
}

DeviceBoardBody.propTypes = {
    deviceList: PropTypes.array,
};

export default DeviceBoardBody;