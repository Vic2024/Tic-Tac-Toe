import { getControl } from "../Helper/getContol"
import React from 'react'
export default function useForm({ route, inputs, state, authorization, token }) {
    const [res, setRes] = React.useState(state)
    async function FETCH({ method, id, input }) {
        setRes({ ...state, isLoading: true })
        const result = await fetch(id ? `${route}/${id}` : route, {
            method: method,
            body: JSON.stringify(input),
            headers: {
                'content-type': 'application/json',
                authorization: `${authorization === true ? `Bearer ${token}` : ''}`
            }
        })
        if ((result.status >= 400) && (result.status <= 500)) {
            const data = await result.json()
            setRes({ ...state, error: { ...state.error, ...data.error }, isLoading: false })
            return { isSucces: false }
        }
        if (result.status === 200 | result.status === 201) {
            const data = await result.json()
            setRes({ ...state, success: { ...state.success, ...data }, isLoading: false })
            return { isSucces: true, data: { ...data.data } }
        }
    }
    
    async function POST({ input }) {
        const result = await FETCH({ method: 'POST', input })
        return result
    }

    async function PATCH({ id, input }) {
        const result = await FETCH({ method: 'PATCH', id, input })
        return { ...result, method: 'PATCH' }
    }

    async function DELETE({ id, input }) {
        const confirmPassword = input.confirmPassword
        const result = await FETCH({ method: 'DELETE', id, input: { confirmPassword } })
        return { ...result, method: 'DELETE' }
    }

    async function handleMethod(event) {
        event.preventDefault()
        const { elements } = event.currentTarget
        const id = getControl(elements.namedItem('id'))
        const dataInputs = {}
        inputs.map(input => {
            const isInput = getControl(elements.namedItem(input))
            if (isInput) {
                dataInputs[input] = isInput.value
            }
        })
        if (id) {
            if (event.nativeEvent.submitter.id === 'edit') {
                return await PATCH({ id: id.value, input: { ...dataInputs } })
            } else {
                return await DELETE({ id: id.value, input: { ...dataInputs } })
            }
        } else {
            return await POST({ input: dataInputs })
        }


    }

    return { handleMethod, res }
}