// js/plugins/GeoTour.jsx

import React, {useState} from "react";
import { Button, Panel, Glyphicon } from "react-bootstrap";
import { createSelector } from "reselect";
import Dropzone from 'react-dropzone';
import bbox from '@turf/bbox';

import { connect, createPlugin } from "@mapstore/utils/PluginsUtils";
import DockablePanel from "@mapstore/components/misc/panels/DockablePanel";
import Message from "@mapstore/components/I18N/Message";
import BorderLayout from "@mapstore/components/layout/BorderLayout";
import { isLoggedIn } from "@mapstore/selectors/security";
import { toggleControl, setControlProperty } from "@mapstore/actions/controls";
import { readJson } from '@mapstore/utils/FileUtils';
import { updateAdditionalLayer } from '@mapstore/actions/additionallayers';
import { zoomToExtent } from '@mapstore/actions/map';

import { uploadFile } from '@js/actions/geotour';
import { geotourFileSelector, geotourEnabledSelector, geotourReverseGeocodeDataSelector } from '@js/selectors/geotour';
import geotour from '@js/reducers/geotour';
import * as geotourEpics from '@js/epics/geotour';

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
    id = "geo-tour-plugin",
    dockStyle = {},
    file = null,
    panelClassName = "",
    dropMessage = "Drop here a geojson that can be used to fly to its features",
    enabled = true,
    showCloseButton = false,
    reverseGeocodeData = "",
    onClose = () => {},
    onUpload = () => {},
    addMarkers = () => {},
    flyTo = () => {}
}) => {
    const [flyToEnabled, setFlyToEnabled] = useState(false);
    const uploadFiles = (files) => {
        if (!files) return;
        // onUpload(files);
        const fileToParse = files[0];
        readJson(fileToParse).then(f => {

            // eslint-disable-next-line no-console
            console.log("file:", f);
            onUpload({...f});
            addMarkers(
                "geotour-layer",
                "goutour",
                'overlay',
                {
                    id: "geotour-layer",
                    name: "geotour-layer",
                    type: "vector",
                    features: f.features.map(ft => ({
                        ...ft,
                        style: {
                            "iconGlyph": "comment",
                            "iconShape": "square",
                            "iconColor": "blue",
                            "iconAnchor": [ 0.5, 0.5],
                            "filtering": true
                        }
                    }))
                });
        });
    };

    // eslint-disable-next-line no-console
    return enabled ? (<DockablePanel
        open={enabled}
        dock
        draggable={false}
        size={660}
        position="right"
        bsStyle="primary"
        title={<Message msgId="geotour.name"/> /* edit me with custom translations */}
        onClose={showCloseButton ? onClose : null}
        glyph="globe"
        style={dockStyle}
    >
        <Panel id={id} className={panelClassName}>
            <BorderLayout>
                <Dropzone
                    key="DragZone"
                    rejectClassName="alert-danger"
                    className="alert alert-info"
                    onDrop={uploadFiles}
                    style={{}}
                    activeStyle={{}}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center"
                    }}>
                        <span style={{
                            width: "100px",
                            height: "100px",
                            textAlign: "center"
                        }}>
                            <Glyphicon glyph="upload" />
                            {dropMessage}
                        </span>
                    </div>
                </Dropzone>
                {file ? <>
                    <div>
                        <table className="geotour-table-results">
                            <tr>
                                <td>
                                action
                                </td>
                                <td>
                                #
                                </td>
                                <td className="table-geom-type">
                                geometry type
                                </td>
                                <td>
                                coordinates
                                </td>
                            </tr>
                            { file.features.map((ft, index) => {
                                return (<tr>
                                    <td>
                                        <Button disabled={!flyToEnabled} onClick={() => {
                                            flyTo(bbox(ft), "EPSG:4326", 5, {duration: 1000, point: ft.geometry.coordinates});
                                        }}>fly to</Button>
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{ft.geometry.type}</td>
                                    <td>{ft.geometry.coordinates.toString()}</td>
                                </tr>);
                            }) }
                        </table>
                        {
                            reverseGeocodeData ? (
                                <>
                                    <p>ReverseGeocodeData address</p>
                                    <li> state {reverseGeocodeData?.address?.state || "" }</li>
                                    <li> country {reverseGeocodeData?.address?.country || "" }</li>
                                    <li> city {reverseGeocodeData?.address?.city || "" }</li>
                                </>
                            ) : null }
                    </div>
                    <p>Click next button in order to {flyToEnabled ? "disable" : "enable"} fly to</p>
                    <Button onClick={() => {
                        setFlyToEnabled(!flyToEnabled);
                    }}>fly to</Button>
                </>
                    : null }
            </BorderLayout>
        </Panel>
    </DockablePanel>) : null;
};

const ConnectedPlugin = connect(createSelector([
    geotourEnabledSelector,
    geotourFileSelector,
    geotourReverseGeocodeDataSelector
], (enabled, file, reverseGeocodeData) => ({
    enabled,
    file,
    reverseGeocodeData
})), {
    onClose: setControlProperty.bind(null, "geotour", "enabled", false, false),
    onUpload: uploadFile,
    addMarkers: updateAdditionalLayer,
    flyTo: zoomToExtent
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
    },
    reducers: {
        geotour
    },
    epics: geotourEpics
});
