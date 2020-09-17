import { atom } from "recoil";
import { Story } from "../database/Database";

export const currentStoryState = atom({
    key: "currentStory",
    default: {} as Story
});