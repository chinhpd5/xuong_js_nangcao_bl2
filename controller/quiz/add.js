import {addQuiz} from '../../api/quiz.js'

function handleAdd (){
    const form = document.querySelector('#formAdd');
    form.addEventListener('submit',async(e)=>{
        // ngăn chặn hành vi tải trang
        e.preventDefault();
        // console.log("submit");

        const inputTitle = document.querySelector('#title');
        const inputIsActive = document.querySelector('#isActive');
        const inputTime= document.querySelector('#time');
        const inputDescription = document.querySelector('#description');

        // b1: validate
        if(!inputTitle.value){
            alert("Cần nhập thông tin Tên quiz");
            inputTitle.focus();
            return;
        }

        if(!inputTime.value){
            alert("Cần nhập thông tin thời gian");
            inputTime.focus();
            return;
        }

        // B2: lấy data
        const data = {
            title: inputTitle.value,
            isActive: inputIsActive.checked,
            time: Number(inputTime.value),
            description: inputDescription.value
        }

        console.log(data);
        
        // B3: thêm mới quiz

        const res = await addQuiz(data);
        if(res.ok){
            const data = await res.json();
            window.location= `/view/question/add.html?id=${data.id}`
            alert("Thêm quiz thành công")
        }
        
    })
}

handleAdd();