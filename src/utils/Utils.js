export const parseError = error => {
    if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data')) {
        if (error.response.data.hasOwnProperty('error') && error.response.data.error.hasOwnProperty('message')) {
            return error.response.data.error.message.toString()
        }
        if (error.response.data.hasOwnProperty('errors')) {
            const errors = Object.keys(error.response.data.errors).map(k => error.response.data.errors[k])
            if (errors.length > 0) {
                return errors[0].toString()
            }

            return error.response.data.message.toString()
        }
    }

    if (error.hasOwnProperty('message')) {
        return error.message.toString()
    }

    return error
}
