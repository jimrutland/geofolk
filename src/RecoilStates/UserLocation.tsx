import { Coords } from "google-map-react";
import { atom } from "recoil";

export const userLocation = atom({
    key: "userLocation",
    default: {
        lat: 39.8097343,
        lng: -98.5556199
    } as Coords
});