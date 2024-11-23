// const myName = "chinhpd5";
// export const age =20;
// export const home ="Hà nội";

// export default myName;

// chỉ có duy nhất 1 export default: import myName from

// export có thể có nhiều
// export: để import thì cần import {age,home} from ....

// xử lý các hàm call api

export const getAllUsers =async ()=>{
    try {
        const res = await fetch('http://localhost:3000/users');
        const data = await res.json();
        return data
    } catch (error) {
        alert("lỗi "+ error)
    }
}

export const getUserById = async(id)=>{
    try {
        const res = await fetch(`http://localhost:3000/users/${id}`)
        const data = await res.json();
        return data;
    } catch (error) {
        alert(error)
    }
}

export const addUser = async (data)=>{
    try {
        const res = await fetch('http://localhost:3000/users',{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        return res;
        
    } catch (error) {
        alert("Lỗi: "+ error)
    }
}

export const updateUser =async (id,data)=>{
    try {
        const res = await fetch(`http://localhost:3000/users/${id}`,{
            method: 'put',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        return res;
    } catch (error) {
        alert(error)
    }
}

export const deleteUser = async (id)=>{
    try {
        const res = await fetch(`http://localhost:3000/users/${id}`,{
            method: 'delete'
        })
        return res;
    } catch (error) {
        alert("lỗi: "+ error)
    }
}