import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"
import { UseCookie } from "../hooks/useCookie"

const cookies = UseCookie()

export const appSlice = createSlice({
    name: "app",
    initialState: {
        tokens: {
            access: localStorage.getItem("ata"),
            refresh: localStorage.getItem("atr"),
        },

        user: localStorage.getItem("ata")
            ? jwtDecode(localStorage.getItem("ata")).data
            : {},

        activeLink: "home",

        moods: {
            createPost: false,
            verification: cookies.get("acid") !== null,
            playingAudio: false,

            loadingRequest: null,
            errorMessage: null,
            successMessage: null,
            infoMessage: null,
        },

        dummy: cookies.get("dusr") ? JSON.parse(cookies.get("dusr")) : null,
    },
    reducers: {
        updateAuthTokens: (state, action) => {
            if (action.payload.dispatch) {
                state.tokens = {}
                state.user = {}
            } else {
                if (action.payload.access) {
                    state.tokens = action.payload
                    localStorage.setItem("ata", action.payload.access)
                    localStorage.setItem("atr", action.payload.refresh)
                    // ? update the user as well
                    state.user = jwtDecode(action.payload.access).data
                }
            }
        },

        updateActiveLink(state, action) {
            const activeLink = state.activeLink
            const currentLink = action.payload.data

            const activeLinkElement = document.querySelector(
                `nav [data-link="${activeLink}"]`,
            )

            const currentLinkElement = document.querySelector(
                `nav [data-link="${currentLink}"]`,
            )

            activeLinkElement.classList.remove("active")
            currentLinkElement.classList.add("active")

            state.activeLink = currentLink
        },

        updateModes(state, action) {
            if (action.payload.dispatch) {
                state.moods = {
                    verification: cookies.get("acid") !== null,

                    createPost: false,
                    playingAudio: false,

                    loadingRequest: null,
                    errorMessage: null,
                    successMessage: null,
                    infoMessage: null,
                }
            } else {
                state.moods = {
                    ...state.moods,
                    ...action.payload,
                }
            }
        },
    },
})

export const { updateAuthTokens, updateModes, updateActiveLink } =
    appSlice.actions
export default appSlice.reducer
