import {getAllQuiz} from '../../api/quiz.js'

const app = {
    renderListQuiz:async function (){
        // B1: call api lấy danh sách quiz
        const listQuiz = await getAllQuiz();
        console.log(listQuiz);

        // B2: đổ ra list
        const tr = listQuiz.map((item,index)=>{
            if(item.isActive)
                return `
                    <a href="./question.html?id=${item.id}" class="list-group-item list-group-item-action list-group-item-primary">
                        Quiz ${index+1} : ${item.title}
                    </a>
                `
        }).join('')

        document.querySelector('#list_quiz').innerHTML = tr;
        
    },
    
    start: function (){
        this.renderListQuiz()
    }
}

app.start();
