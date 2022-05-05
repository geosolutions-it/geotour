// js/plugins.js
import appConfig from "@mapstore/product/appConfig.js";

import TourPage from "@js/pages/Tour";

/**
 * This will compose the list of plugins that can be accessed from your application, and that wil lbe included in the bundle
 */

export default {
    ...appConfig,
    pages: [
        ...appConfig.pages,
        {
            name: "tour",
            path: "/tour/:mapId",
            component: TourPage
        }
    ]
};


