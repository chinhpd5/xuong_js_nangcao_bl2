
export const addListQuestion = async(data)=>{
    // thêm mới dữ liệu mảng data vào db (question)
    // data là mảng
    // không thể thêm 1 lúc 1 mảng vào db
    // forEach lặp và thêm từng phần tử của data vào db
}

export const getQuestionsByIdQuiz =async (idQuiz)=>{
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`);
        const data = await res.json();
        return data;
    } catch (error) {
        alert("Lỗi")
    }
}