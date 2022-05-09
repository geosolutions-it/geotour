
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';

import GeoTourPlugin from '@js/plugins/GeoTour';
import { getPluginForTest } from '@mapstore/plugins/__tests__/pluginsTestUtils';

describe('Geostories Plugin', () => {

    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('creates GeoTour plugin with default configuration', () => {
        const { Plugin } = getPluginForTest(GeoTourPlugin, {
            controls: {
                geotour: {
                    enabled: true
                }
            }
        });
        ReactDOM.render(<Plugin/>, document.getElementById("container"));
        const buttons = document.querySelectorAll('.glyphicon-upload');
        expect(buttons.length).toBe(1);

    });
});
