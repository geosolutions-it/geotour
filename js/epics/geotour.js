
import Rx from 'rxjs';
import { ZOOM_TO_EXTENT } from '@mapstore/actions/map';
import { showMapinfoRevGeocode } from '@mapstore/actions/mapInfo';


export const addFeatureinfoEpic = (action$) => action$.ofType(ZOOM_TO_EXTENT)
    .switchMap(
        (action) => {

            return Rx.Observable.from(
                [showMapinfoRevGeocode({lng: action.options.point[0], lat: action.options.point[1] })]
            );
        }
    );
