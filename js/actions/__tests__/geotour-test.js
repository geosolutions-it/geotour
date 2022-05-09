
export const GEOTOUR_UPLOAD_FILE = "GEOTOUR:GEOTOUR_UPLOAD_FILE";

export const uploadFile = (file) => ({
    type: GEOTOUR_UPLOAD_FILE,
    file
});
