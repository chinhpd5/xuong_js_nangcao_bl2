
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