import { atom } from "recoil";
import { Story } from "../models/Story";

export const currentStoryState = atom({
    key: "currentStory",
    default: {} as Story
});

export const currentStoryText = atom({
    key: "newStoryText",
    default: ""
});

export const currentStoryTitle = atom({
    key: "newStoryTitle",
    default: ""
});