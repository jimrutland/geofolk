import { atom } from "recoil";

export const addingStoryState = atom({
    key: 'addingStory',
    default: false
});

export const showingStoryCard = atom({
    key: 'showStoryCard',
    default: false
});