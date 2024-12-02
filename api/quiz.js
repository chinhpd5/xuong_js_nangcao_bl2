
export const addQuiz = async(data)=>{
    try {
        const res = await fetch(`http://localhost:3000/quizs`,{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res;
    } catch (error) {
        alert("Lỗi")
    }
}

export const getAllQuiz = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/quizs');
        const data = await res.json();
        return data
    } catch (error) {
        alert("Lỗi")
    }
}

export const getQuizById = async (id)=>{
    try {
        const res = await fetch(`http://localhost:3000/quizs/${id}`);
        const data = await res.json();
        return data
    } catch (error) {
        alert("Lỗi")
    }
}