import { atom } from "recoil";

export const signedIn = atom({
    key: "signedIn",
    default: false
});

export const auth = atom({
    key: "auth",
    default: {}
});