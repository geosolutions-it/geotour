// js/pages/Tour.jsx
import PropTypes  from 'prop-types';
import React, {useEffect}  from 'react';
import {connect}  from 'react-redux';

import Page  from '@mapstore/containers/Page';
import {loadMapConfig as loadMapConfigAction}  from '@mapstore/actions/config';


const GeoTourPage = ({
    name,
    loadMapConfig,
    match,
    plugins,
    pluginsConfig
}) => {

    useEffect(() => {
        loadMapConfig("configs/new.json", null);
        // var id = this.props.match.params.id || 0;
    }, []);

    let pluginsToBeUsed = pluginsConfig;
    let pluginsConfigToBeUsed = {
        "desktop": pluginsToBeUsed[name] || [],
        "mobile": pluginsToBeUsed[name] || []
    };
    return (<Page
        id={name}
        includeCommon={false}
        pluginsConfig={pluginsConfigToBeUsed}
        plugins={plugins}
        params={match.params}
    />);
};

export default connect((state) => {
    return {
        mode: 'desktop',
        pluginsConfig: (state.localConfig && state.localConfig.plugins) || null
    };
}, {
    loadMapConfig: loadMapConfigAction
})(GeoTourPage);


GeoTourPage.propTypes = {
    name: PropTypes.string,
    mode: PropTypes.string,
    loadMapConfig: PropTypes.func,
    match: PropTypes.object,
    plugins: PropTypes.object,
    pluginsConfig: PropTypes.object
};
GeoTourPage.contextTypes = {
    router: PropTypes.object
};
GeoTourPage.defaultProps = {
    name: "tour",
    mode: 'desktop',
    match: {},
    pluginsConfig: {}
};
