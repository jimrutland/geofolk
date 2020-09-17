import { atom } from "recoil";

export const addingStoryState = atom({
    key: 'addingStory',
    default: false
});

export const showingNewStoryCard = atom({
    key: 'showNewStoryCard',
    default: false
});

export const showingExistingStoryCard = atom({
    key: 'showExistingStoryCard',
    default: false
});