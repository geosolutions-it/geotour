// js/plugins.js
import GeoTour from "@js/plugins/GeoTour";
import productPlugins from "@mapstore/product/plugins.js";

/**
 * This will compose the list of plugins that can be accessed from your application, and that wil lbe included in the bundle
 */

export default {
    requires: {
        ...productPlugins.requires
    },
    plugins: {
        ...productPlugins.plugins,
        GeoTourPlugin: GeoTour
    }
};


