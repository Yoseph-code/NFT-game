import Web3 from 'web3'
import YogiToken from '../../contracts/YogiToken.json'
import { fetchData } from '../data/dataActions'

const mainAccount = "0xcb937ebcb8619fff04e781da819b293409eb03ce"

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST"
    }
}

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload
    }
}

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload
    }
}

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload
    }
}

export const connect = () => {
    return async (dispatch) => {
        dispatch(connectRequest())
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum)
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                const networkId = await window.ethereum.request({
                    method: "net_version"
                })
                console.log(networkId)
                if (networkId == 5777) {
                    const yogiToken = new web3.eth.Contract(
                        YogiToken.abi,
                        mainAccount
                    )
                    dispatch(
                        connectSuccess({
                            accounts: accounts[0],
                            yogiToken: yogiToken,
                            web3: web3
                        })
                    )
                    window.ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccount(accounts[0]))
                    })
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload()
                    })
                } else {
                    dispatch(connectFailed("Change network to Polygon"))
                }
            } catch (err) {
                dispatch(connectFailed("Something went wrong"))
            }
        } else {
            dispatch(connectFailed("Install Metamask"))
        }
    }
}

export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({ account: account }))
        dispatch(fetchData(account))
    }
}