import PropTypes  from 'prop-types';
import React  from 'react';
import {connect}  from 'react-redux';

import Page  from '@mapstore/containers/Page';
import {loadMapConfig}  from '@mapstore/actions/config';
// import axios  from '@mapstore/libs/ajax';


class GeoTourPage extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        mode: PropTypes.string,
        geoStoreUrl: PropTypes.string,
        loadMapConfig: PropTypes.func,
        match: PropTypes.object,
        plugins: PropTypes.object,
        pluginsConfig: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object
    }
    static defaultProps = {
        name: "tour",
        mode: 'desktop',
        match: {},
        initPlugin: () => {},
        reset: () => {},
        pluginsConfig: {}
    }
    UNSAFE_componentWillMount() {
        // var id = this.props.match.params.id || 0;
        this.props.loadMapConfig("configs/new.json", null);
    }
    render() {
        let plugins = this.props.pluginsConfig;
        let pluginsConfig = {
            "desktop": plugins[this.props.name] || [],
            "mobile": plugins[this.props.name] || []
        };

        return (<Page
            id="tour"
            includeCommon={false}
            pluginsConfig={pluginsConfig}
            plugins={this.props.plugins}
            params={this.props.match.params}
        />);
    }
}

export default connect((state) => {
    return {
        mode: 'desktop',
        pluginsConfig: (state.localConfig && state.localConfig.plugins) || null
    };
}, {
    loadMapConfig
})(GeoTourPage);
