import axios from "axios"

export const GetListStone = async () => {
    const data = await axios.get("http://localhost:7241/api/StoneMst")
    return data.data.data
}

export const GetStoneById = async (stone_id) => {
    const data = await axios.get(`http://localhost:7241/api/StoneMst/getonestone/${stone_id}`)
    return data.data.data
}

export const PostStone = async () => {
    const data = await axios.post(`http://localhost:7241/api/StoneMst`)
    return data.data.data
}

export const DeleteStone = async (stone_id) => {
    const data = await axios.delete(`http://localhost:7241/api/StoneMst/${stone_id}`)
    return data.data.data
}

export const PutStone = async () => {
    const data = await axios.put("http://localhost:7241/api/StoneMst")
    return data.data.data
}

export const PutStoneVisibility = async (stone_id) => {
    const data = await axios.put(`http://localhost:7241/api/StoneMst/updatevisibility/${stone_id}`)
    return data.data.data
}