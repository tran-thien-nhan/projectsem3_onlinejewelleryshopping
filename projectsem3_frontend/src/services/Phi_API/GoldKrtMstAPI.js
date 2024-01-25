import axios from "axios"

export const GetListGoldKrtMst = async () => {
    const data = await axios.get("http://localhost:7241/api/GoldKrtMst")
    return data.data.data
}

export const GetGoldKrtMstById = async (gold_id) => {
    const data = await axios.get(`http://localhost:7241/api/GoldKrtMst/getonegoldkrt/${gold_id}`)
    return data.data.data
}

export const PostGoldKrtMst = async () => {
    const data = await axios.post(`http://localhost:7241/api/GoldKrtMst`)
    return data.data.data
}

export const DeleteGoldKrtMst = async (gold_id) => {
    const data = await axios.delete(`http://localhost:7241/api/GoldKrtMst/${gold_id}`)
    return data.data.data
}

export const PutGoldKrtMst = async () => {
    const data = await axios.put("http://localhost:7241/api/GoldKrtMst")
    return data.data.data
}

export const PutGoldKrtMstVisibility = async (gold_id) => {
    const data = await axios.put(`http://localhost:7241/api/GoldKrtMst/updatevisibility/${gold_id}`)
    return data.data.data
}