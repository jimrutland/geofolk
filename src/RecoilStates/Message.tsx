import { atom } from "recoil";
import { ToastMessage } from "../models/ToastMessage";

export const displayMessage = atom({
    key: "displayMessage",
    default: new ToastMessage("", "")
});

export const showToast = atom({
    key: "showToast",
    default: false
});