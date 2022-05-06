import { GEOTOUR_UPLOAD_FILE } from '@js/actions/geotour';
import { SHOW_REVERSE_GEOCODE } from '@mapstore/actions/mapInfo';


export const geotour = (state = {}, action) => {
    switch (action.type) {
    case GEOTOUR_UPLOAD_FILE: {
        return {
            ...state,
            file: action.file
        };
    }
    case SHOW_REVERSE_GEOCODE: {
        return {
            ...state,
            reverseGeocodeData: action.reverseGeocodeData
        };
    }

    default:
        return state;
    }
};

export default geotour;
