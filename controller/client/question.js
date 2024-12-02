import {getQuizById} from '../../api/quiz.js'
import {getQuestionsByIdQuiz} from '../../api/question.js'

const app ={
    getId: function (){
        const param = new URLSearchParams(window.location.search);
        if(param.has('id')){
            return param.get('id')
        }
    },
    renderInfoQuiz:async function (id){
        const data = await getQuizById(id);
        // console.log(data);

        document.querySelector('#quiz_heading').innerHTML = data.title;
        document.querySelector('#quiz_description').innerHTML = data.description;

        this.countDown(data.time);
        
    },
    countDown: function (time){
        const timeElement = document.querySelector('#timer');

        function handlerTime(){
            const minute = Math.floor(time/60);
            // console.log(minute);
            const second = time%60;
            // console.log(second);
            const stringTime = `
                ${minute<10?'0':''}${minute}
                :
                ${second<10?'0':''}${second}
            `
            // console.log(stringTime);
            timeElement.innerHTML = stringTime;

            time--;

            if(time <= 0){
                clearInterval(timeInter)
                timeElement.innerHTML = 'Hết thời gian';
            }
            
        }

        const timeInter = setInterval(handlerTime,1000)
    },
    renderQuestion:async function (idQuiz){
        // Bước 1: Lấy danh sách các câu hỏi của quiz
        const listQuestion = await getQuestionsByIdQuiz(idQuiz);
        // console.log(listQuestion);
        const questions = listQuestion.map((item,index)=>{
            const answers = this.renderAnswer(item.answers,item.id,item.type)

            return `
                <div class="question_item border border-2 rounded p-4 mb-2">
                    <h4 class="question_number">Câu hỏi: ${index+1}</h4>
                    <h5 class="question_title">
                        ${item.questionTiltle}
                    </h5>
                    <div class="answer_items mt-3">
                        ${answers}
                    </div>
                </div>
            `
        }).join('');

        document.querySelector('#question_container').innerHTML = questions;

        
    },
    renderAnswer: function (listAnswer,idQuestion,type){
        // console.log(listAnswer);
        return listAnswer.map((ans,index)=>{
            return `
                <div class="form-check fs-5 mb-3" >
                    <input class="form-check-input border border-2 border-primary" role="button" 
                        type="${type==1?'radio':'checkbox'}" name="question_${idQuestion}" id="answer_${idQuestion}_${ans.id}" >
                    <label class="form-check-label" role="button" for="answer_${idQuestion}_${ans.id}" >
                        ${ans.answerTitle}
                    </label>
                </div>
            `
        }).join('')
    },

    start: function (){
        const idQuiz = this.getId();
        // console.log(idQuiz);

        // Hiển thị dữ liệu của quiz
        this.renderInfoQuiz(idQuiz)

        // Hiển thị dữ liệu của câu hỏi
        this.renderQuestion(idQuiz)
        
    }
}

app.start();