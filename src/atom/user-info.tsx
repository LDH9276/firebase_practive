import { atom } from "recoil";

export const userInfoState = atom({
    key: "userInfoState",
    default: {
        name: "",
        email: "",
    },
});

export const loadingState = atom({
    key: "isLoading",
    default: false,
});
