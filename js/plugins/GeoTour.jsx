// js/plugins/GeoTour.jsx

import React from "react";
import { Panel, Glyphicon } from "react-bootstrap";
import { createSelector } from "reselect";

import { connect, createPlugin } from "@mapstore/utils/PluginsUtils";
import DockablePanel from "@mapstore/components/misc/panels/DockablePanel";
import Message from "@mapstore/components/I18N/Message";
import BorderLayout from "@mapstore/components/layout/BorderLayout";
import { isLoggedIn } from "@mapstore/selectors/security";

import { toggleControl, setControlProperty } from "@mapstore/actions/controls";

/**
 * The GeoTour plugin allows you to
 * @memberof plugins
 * @prop {object} cfg properties that can be configured for this plugin
 * TODO @prop {object} [cfg.XXX=false] if true, default is false
  */

/**
 * It"s a functional component, i.e. it"s a function that returns a React component
 * @prop {object} props passed to the component, in this case from the connect function
 * @returns {React.Component} the component to be used inside the plugin
 */

const PanelContainer = ({
    id = "geo-tour",
    dockStyle = {},
    panelClassName = "",
    enabled = false,
    onClose = () => {}
}) => {
    // eslint-disable-next-line no-console
    return (<DockablePanel
        open={enabled}
        dock
        draggable={false}
        size={660}
        position="right"
        bsStyle="primary"
        title={<Message msgId="geotour.name"/> /* edit me with custom translations */}
        onClose={onClose}
        glyph="globe"
        style={dockStyle}
    >
        <Panel id={id} className={panelClassName}>
            <BorderLayout>
                This will be an awesome plugin
            </BorderLayout>
        </Panel>
    </DockablePanel>);
};

const ConnectedPlugin = connect(createSelector([
    state => state?.controls?.geotour?.enabled
], (enabled) => ({
    enabled
})), {
    onClose: setControlProperty.bind(null, "geotour", "enabled", false, false)
})(PanelContainer);

// export the plugin using the createPlugin utils which is the recommended way
export default createPlugin("GeoTour", {
    component: ConnectedPlugin,
    containers: {
        BurgerMenu: {
            name: "geotour",
            position: 30,
            text: <Message msgId="geotour.name"/>,
            icon: <Glyphicon glyph="globe"/>,
            action: toggleControl.bind(null, "geotour", null),
            // display the BurgerMenu button only if the map can be edited
            selector: createSelector(
                isLoggedIn,
                (loggedIn) => ({
                    style: loggedIn ? {} : { display: "none" }
                })
            )
        }
    }
});
