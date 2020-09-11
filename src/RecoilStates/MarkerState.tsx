import { atom } from "recoil";

export const shouldRemoveCurrentMarker = atom({
    key: "removingCurrentMarker",
    default: false
});