import axios from "axios"

export const GetListCategory = async () => {
    const data = await axios.get("http://localhost:7241/api/CatMst")
    return data.data.data
}

export const GetCatById = async (cat_id) => {
    const data = await axios.get(`http://localhost:7241/api/CatMst/getonecategory/${cat_id}`)
    return data.data.data
}

export const PostCat = async () => {
    const data = await axios.post(`http://localhost:7241/api/CatMst`)
    return data.data.data
}

export const DeleteCat = async (cat_id) => {
    const data = await axios.delete(`http://localhost:7241/api/CatMst/${cat_id}`)
    return data.data.data
}

export const PutCat = async () => {
    const data = await axios.put("http://localhost:7241/api/CatMst")
    return data.data.data
}

export const PutCatVisibility = async (cat_id) => {
    const data = await axios.put(`http://localhost:7241/api/CatMst/updatevisibility/${cat_id}`)
    return data.data.data
}