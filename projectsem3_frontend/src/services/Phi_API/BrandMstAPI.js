import axios from "axios"

export const GetListBrand = async () => {
    const data = await axios.get("http://localhost:7241/api/BrandMst")
    return data.data.data
}

export const GetBrandById = async (brand_id) => {
    const data = await axios.get(`http://localhost:7241/api/BrandMst/getonebrand/${brand_id}`)
    return data.data.data
}

export const PostBrand = async () => {
    const data = await axios.post(`http://localhost:7241/api/BrandMst`)
    return data.data.data
}

export const DeleteBrand = async (brand_id) => {
    const data = await axios.delete(`http://localhost:7241/api/BrandMst/${brand_id}`)
    return data.data.data
}

export const PutBrand = async () => {
    const data = await axios.put("http://localhost:7241/api/BrandMst")
    return data.data.data
}

export const PutBrandVisibility = async (brand_id) => {
    const data = await axios.put(`http://localhost:7241/api/BrandMst/updatevisibility/${brand_id}`)
    return data.data.data
}