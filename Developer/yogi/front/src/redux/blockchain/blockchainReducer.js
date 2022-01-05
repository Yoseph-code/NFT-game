const initialState = {
    loading: false,
    account: null,
    yogiToken: null,
    web3: null,
    errorMsg: ""
}

const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONNECTION_REQUEST":
            return {
                ...initialState,
                loading: true
            }
        case "CONNECTION_SUCCESS":
            return {
                ...state,
                loading: false,
                account: action.payload.accounts,
                yogiToken: action.payload.yogiToken,
                web3: action.payload.web3
            }
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload
            }
        default:
            return state
    }
}

export default blockchainReducer