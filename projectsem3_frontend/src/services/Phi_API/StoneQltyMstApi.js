import axios from "axios"

export const GetStoneQuantityById = async (stoneQuantity_id) => {
    const data = await axios.get(`http://localhost:7241/api/StoneQltyMst/getonestoneqlty/${stoneQuantity_id}`)
    return data.data.data
}

export const PostStoneQuantity = async () => {
    const data = await axios.post(`http://localhost:7241/api/StoneQltyMst`)
    return data.data.data
}


export const PutStoneQuantity = async () => {
    const data = await axios.put("http://localhost:7241/api/StoneQltyMst")
    return data.data.data
}

