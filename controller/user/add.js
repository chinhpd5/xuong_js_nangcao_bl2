import {addUser} from '../../api/user.js'

function submitForm(){
    // B1: lấy form
    const form = document.querySelector('#formAdd');
    // B2: thêm sự kiện submit cho form
    form.addEventListener('submit',async(e)=>{
        // B2.1: ngăn chặn hành vi tải trang
        e.preventDefault();
        // console.log("submit");

        // B3: lấy input
        const inputName = document.querySelector('#name')
        const inputUsername = document.querySelector('#username')
        const inputPassword = document.querySelector('#password')
        const inputAvatar = document.querySelector('#avatar')
        const inputNote = document.querySelector('#note')

        // B4: Validate

        if(!inputName.value){
            alert("Cần nhập thông tin tên người dùng");
            inputName.focus();// focus vào ô input bị lỗi
            return;
        }
        if(!inputUsername.value){
            alert("Cần nhập thông tin username");
            inputUsername.focus();// focus vào ô input bị lỗi
            return;
        }

        if(!inputPassword.value){
            alert("Cần nhập thông tin password");
            inputPassword.focus();// focus vào ô input bị lỗi
            return;
        }

        // B5: Lấy dữ liệu
        const data = {
            username: inputUsername.value,
            password: inputPassword.value,
            name: inputName.value,
            avatar: inputAvatar.value,
            note: inputNote.value,
        }
        console.log(data);
        

        // B6: Thêm vào DB
        const res = await addUser(data)
        if(res.ok){
            window.location = 'list.html';
            alert("Thêm thành công");
        }
    })

}

submitForm();