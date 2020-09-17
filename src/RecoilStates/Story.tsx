import { atom } from "recoil";
import { Story } from "../models/Story";

export const currentStoryState = atom({
    key: "currentStory",
    default: {} as Story
});