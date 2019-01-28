import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import customisedUsersAxios from "./../customisedAxios/usersAxios.js"
import router from "./../router"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {},
        isAdmin: false,
        users: [],
        auth_status: "",
        signup_status: "",
        // ********
        cryptoData: [],
        cryptoIDs: [],
        portfolio: [],
        totalInvestment: 0,
        profit: 0,
        currentCardInformation: {
            cardID: null,
            coinID: null
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.isAdmin
        },
        users(state) {
            return state.users
        },
        auth_status(state) {
            return state.auth_status
        },
        signup_status(state) {
            return state.signup_status
        },
        // ********
        cryptoData(state) {
            return state.cryptoData
        },
        getCryptoDataById: (state) => (id) => {
            return state.cryptoData.find(coin => coin.id == id)
        },
        portfolio(state) {
            return state.portfolio
        },
        totalInvestment(state) {
            return state.totalInvestment
        },
        profit(state) {
            return state.profit
        },
        currentCardInformation(state) {
            return state.currentCardInformation
        }
    },
    mutations: {
        login(state, data) {
            state.user = data
            state.auth_status = "success"
        },
        auth_error(state) {
            state.auth_status = "error"
        },
        signup_error(state) {
            state.signup_status = "error"
        },
        getUsers(state, data) {
            state.users = data
        },
        createUser(state, data) {
            state.signup_status = "success"
            state.users.push(data)
        },
        deleteUser(state, payload) {
            state.users.splice(payload.index, 1)
        },
        editUser(state, data) {
            state.users.forEach(user => {
                if (user.id == data.id) {
                    user.name = data.name
                    user.password = data.password
                    user.admin = data.admin || false
                }
            })
        },
        clearUserData(state) {
            state.user = {};
            state.isAdmin = false
            localStorage.clear()
            router.push({ path: "/login" })
        },
        // ********
        saveCryptoDataLocally(state, data) {
            state.cryptoData = []
            data.forEach(crypto => {
                const newCrypto = {
                    id: crypto.id,
                    name: crypto.name,
                    symbol: crypto.symbol,
                    slug: crypto.slug,
                    logo: crypto.logo,
                    change24h: crypto.quote.USD.percent_change_24h,
                    usdCurrentPrice: crypto.quote.USD.price,
                    btcCurrentPrice: null
                }
                state.cryptoData.push(newCrypto)
            })
        },
        addCardToPortfolio(state, card) {
            if (Array.isArray(card)) {
                state.portfolio = card
            } else {
                state.portfolio.push(card)
            }
        },
        updateTotalInvestementPrice(state, payload) {
            if (Array.isArray(payload)) {
                payload.forEach(card => {
                    state.totalInvestment += card.amount * card.usdBuyPrice
                })
            } else {
                state.totalInvestment = payload
            }
        },
        updateProfit(state, payload) {
            state.profit = payload
        },
        removeCardFromPortfolio(state, card) {
            let index = state.portfolio.findIndex(coin => coin.cardID == card.cardID)
            state.portfolio.splice(index, 1)
        },
        setCurrentCardID(state, card) {
            state.currentCardInformation.cardID = card.cardID
            state.currentCardInformation.coinID = card.coinID
        }
    },
    actions: {
        login(context, payload) {
            customisedUsersAxios.post("/login", payload)
                .then(res => {
                    if (res.data.token) {
                        if (res.data.admin) {
                            context.state.isAdmin = true
                        }
                        //redirects to home after log in
                        router.push({ path: "/" })
                        context.commit("login", res.data)

                        // auto log out after X seconds has passed(check out API to see the expiresIn value)
                        context.dispatch("setLogoutTimer", res.data.expiresIn)

                        let now = new Date(Date.now());
                        let expirationDate = new Date(now.getTime() + (res.data.expiresIn * 1000));
                        localStorage.setItem("expirationDate", expirationDate)
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data.id);
                        localStorage.setItem("username", res.data.username);
                        localStorage.setItem("admin", res.data.admin);
                    }
                })
                .catch(() => {
                    context.commit("auth_error")
                })
        },
        async getUsers(context) {
            const response = await customisedUsersAxios.get("/users", {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
            context.commit("getUsers", response.data)
        },
        async createUser(context, payload) {
            try {
                const response = await customisedUsersAxios.post("/users", payload, {
                    headers: {
                        'x-api-token': context.state.user.token
                    }
                })
                context.commit("createUser", response.data)
            } catch (error) {
                context.commit("signup_error")
            }
        },
        deleteUser(context, payload) {
            customisedUsersAxios.delete("/users/" + payload.id, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
                .then(() => {
                    context.commit("deleteUser", payload)
                })
        },
        editUser(context, payload) {
            customisedUsersAxios.put("/users/" + payload.id, payload, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
                .then(res => {
                    context.commit("editUser", res.data)
                })
        },
        logout(context) {
            context.commit("clearUserData")
        },
        setLogoutTimer(context, expirationTime) {
            setTimeout(() => {
                context.commit("clearUserData")
            }, expirationTime * 1000)
        },
        //dispatched in app.vue
        tryAutoLogin(context) {
            const token = localStorage.getItem("token");
            if (!token) return

            const expirationDate = localStorage.getItem("expirationDate")
            const now = Date.now()
            if (now >= new Date(expirationDate)) {
                context.commit("clearUserData")
                return
            }
            const id = localStorage.getItem("id")
            const username = localStorage.getItem("username")
            const admin = localStorage.getItem("admin")
            if (admin === "true") {
                context.state.isAdmin = true
            }
            context.commit("login", {
                id,
                username,
                admin,
                token
            })
        },
        async getCryptoData(context) {
            const response = await axios.get("http://localhost:3000/coins", {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
            context.commit("saveCryptoDataLocally", response.data)
        },
        addCardToPortfolio(context, card) {
            context.commit("addCardToPortfolio", card)
        },
        updateTotalInvestementPrice(context, payload) {
            context.commit("updateTotalInvestementPrice", payload)
        },
        updateProfit(context, payload) {
            context.commit("updateProfit", payload)
        },
        removeCardFromPortfolio(context, card) {
            const userID = context.state.user.id
            const cardID = card.cardID
            axios.delete("http://localhost:3000/users/" + userID + "/card/" + cardID, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
            context.commit("removeCardFromPortfolio", card)
            context.commit("updateTotalInvestementPrice", -card.amount * card.usdBuyPrice)
        },
        setCurrentCardID(context, payload) {
            context.commit("setCurrentCardID", payload)
        },
        async saveCardInDB(context, payload) {
            const userID = context.state.user.id
            await axios.post("http://localhost:3000/users/" + userID + "/card", payload, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
        },
        // call in portfolio.vue
        async getCardsFromDB(context) {
            const userID = context.state.user.id
            const response = await axios.get("http://localhost:3000/users/" + userID + "/cards", {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
            context.commit("addCardToPortfolio", response.data)
            context.commit("updateTotalInvestementPrice", response.data)

        }
    }
})
