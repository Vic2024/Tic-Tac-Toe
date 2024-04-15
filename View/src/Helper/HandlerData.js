export default function handlerData() {
    const get = ({ data }) => [...data]
    const push = ({ prevData, data }) => [...prevData, ...data]
    const update = ({ prevData, data }) => {
        let dataSaved, dataFilter
        if (prevData.find(game => game.gameid === data.id) !== undefined) {
            dataSaved = prevData.find(game => game.gameid === data.id)
            dataFilter = [...prevData.filter(game => game.gameid !== data.id)]
        } else {
            dataSaved = prevData.find(game => game.gameid === data.gameid)
            dataFilter = [...prevData.filter(game => game.gameid !== data.gameid)]
        }

        const newData = {
            ...dataSaved,
            ...data
        }
        const result = [...dataFilter, { ...newData }]
        return result
    }
    const deleteData = ({ prevData, data }) => {
        if (typeof data === 'number') return [...prevData.filter(el => el.id !== data)]
        else return [...prevData.filter(el => el.idrivals !== data)]
    }



    return { get, push, update, deleteData }

}



