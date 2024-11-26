
import {addListQuestion} from '../../api/question.js'

const app = {
    // hiển thị câu hỏi
    renderQuestion: function(){
        // B0: lấy vị trí (thứ tự) của câu hỏi
        const currentQuestion = document.querySelectorAll('.question_item').length + 1;
        // console.log(currentQuestion);

        // B1: tạo phần tử chứa câu hỏi và đáp án
        const item = document.createElement('div');
        item.classList = 'question_item border border-2 border-primary rounded p-3 mb-3';

        // B2: Thêm nội dung (câu hỏi và câu trả lời) vào item(div)
        item.innerHTML = `
            <h4 >Câu hỏi ${currentQuestion}</h4>

            <div class="mb-3">
                <label for="question_title_${currentQuestion}" class="form-label">Nhập nội dung câu hỏi:</label>
                <textarea class="form-control" id="question_title_${currentQuestion}" rows="2"></textarea>
            </div>

            <div class="items_answer">

                <div class="form-check">
                    <input name="answer_${currentQuestion}" class="form-check-input border border-2 border-primary" type="radio" id="answer_check_${currentQuestion}_1">
                     <div class="mb-3">
                        <input type="text" class="form-control" id="answer_title_${currentQuestion}_1" placeholder="Nhập nội dung đáp án 1">
                    </div>
                </div>

                <div class="form-check">
                    <input name="answer_${currentQuestion}" class="form-check-input border border-2 border-primary" type="radio" id="answer_check_${currentQuestion}_2">
                     <div class="mb-3">
                        <input type="text" class="form-control" id="answer_title_${currentQuestion}_2" placeholder="Nhập nội dung đáp án 2">
                    </div>
                </div>

                <div class="form-check">
                    <input name="answer_${currentQuestion}" class="form-check-input border border-2 border-primary" type="radio" id="answer_check_${currentQuestion}_3">
                     <div class="mb-3">
                        <input type="text" class="form-control" id="answer_title_${currentQuestion}_3" placeholder="Nhập nội dung đáp án 3">
                    </div>
                </div>

                <div class="form-check">
                    <input name="answer_${currentQuestion}" class="form-check-input border border-2 border-primary" type="radio" id="answer_check_${currentQuestion}_4">
                     <div class="mb-3">
                        <input type="text" class="form-control" id="answer_title_${currentQuestion}_4" placeholder="Nhập nội dung đáp án 4">
                    </div>
                </div>

            </div>

        `

        // Bước cuối
        const listQuestion = document.querySelector('#listQuestion');
        listQuestion.appendChild(item);

        // focus vào ô nhập nội dung câu hỏi
        const titleQuestion = document.querySelector(`#question_title_${currentQuestion}`);
        titleQuestion.focus();
        titleQuestion.scrollIntoView({behavior: 'smooth'});
    },

    // xử lý khi nhấn nút thêm mới câu hỏi
    handleAddQuestion: function(){
        const btnAdd = document.querySelector('#addQuestion');
        btnAdd.addEventListener('click',()=>{
            this.renderQuestion();      
        })
    },

    // lưu đáp án
    handleSaveQuestion: function(){
        const btnSave = document.querySelector('#saveQuestions');
        btnSave.addEventListener('click',async()=>{
            // bước 1 : lấy toàn bộ box câu hỏi
            const items = document.querySelectorAll('.question_item');
            // console.log(items);

            // bước 2: lấy id trên URL
            let id;
            const param = new URLSearchParams(window.location.search);
            if(param.has("id")){
                id = param.get('id');
            }
            // console.log(id);
            
            // bước 3: duyệt mảng item để lấy thông tin (for)
            const data =[];

            for(var i =0; i< items.length; i++){
                // Bước 3.1: lấy item nội dung câu hỏi
                let questionTitle = items[i].querySelector(`#question_title_${i+1}`);
                // console.log(questionTitle);
                

                // Bước 3.2: lấy các item lựa chọn( radio hoặc checkbox)
                let answerChecks = items[i].querySelectorAll('input[type="radio"]');
                // console.log(answerChecks);

                // Bước 3.3: lấy nội dung item các câu trả lời
                let answerTitles = items[i].querySelectorAll('input[type="text"]');
                // console.log(answerTitles);
                

                // Bước 4: validate
                let isCheck = this.validate(questionTitle,answerChecks,answerTitles)
                // console.log(isCheck);
                
                // nếu 1 box bị lỗi
                if(!isCheck){
                    break;
                }
                
                // nếu không có lỗi -> lưu vào db
                const item = {
                    questionTiltle: questionTitle.value,
                    answers: [],
                    quizId: id,
                    type: 1,
                    correctAnser:[]
                }

                answerTitles.forEach((content,index)=>{
                    item.answers.push({
                        id: (index+1).toString(),
                        answerTitle: content.value
                    })
                })

                answerChecks.forEach((check,index)=>{
                    if(check.checked){
                        item.correctAnser.push((index+1).toString())
                    }
                })

                data.push(item)
            }

            // console.log(data);
            await addListQuestion(data)
            
        })
    },

    validate: function(questionTitle,answerChecks,answerTitles){
        // validate nội dung câu hỏi
        if(!questionTitle.value){
            alert("Cần nhập nội dung câu hỏi");
            questionTitle.focus();
            return false;
        }

        // validate đáp án đúng
        let isChecked = false
        for(var i =0 ;i<answerChecks.length; i++){
            if(answerChecks[i].checked){ // cần ít nhất 1 đáp lựa chọn
                isChecked = true
            }
        }
        if(!isChecked){// nếu không có ít nhất đáp án nào được chọn
            alert("Cần lựa chọn ít nhất 1 đáp án đúng")
            answerChecks[0].focus();
            return false;
        }

        // validate nội dung đáp án
        let isValue = true;
        for(var i =0; i < answerTitles.length; i++){
            if(!answerTitles[i].value){
                alert("cần nhập nội dung câu trả lời");
                answerTitles[i].focus();
                isValue= false;
                break;
            }
        }

        if(!isValue){
            return false;
        }
        return true
    },

    start: function(){
        this.renderQuestion();
        this.handleAddQuestion();
        this.handleSaveQuestion();
    }
}

app.start();