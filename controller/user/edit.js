import {getUserById,updateUser} from '../../api/user.js'
let id;
const inputName = document.querySelector('#name')
const inputUsername = document.querySelector('#username')
const inputPassword = document.querySelector('#password')
const inputAvatar = document.querySelector('#avatar')
const inputNote = document.querySelector('#note')

function getIdFromUrl(){
    const param = new URLSearchParams(window.location.search);
    if(param.has('id')){
        id = param.get('id');
        // console.log(id);
        showUserById(id)
    }
}

getIdFromUrl();

async function showUserById(id){
    // B1: Lấy thông tin user theo id 
    const user =await getUserById(id);
    console.log(user);

    // B2: đổ dữ liệu user vào form
    inputName.value = user.name
    inputUsername.value = user.username
    inputPassword.value = user.password
    inputAvatar.value = user?.avatar
    inputNote.value = user?.note
    
}


function submitUpdateUser(){
    //B1: lấy form
    const form = document.querySelector('#formEdit');
    // B2: định nghĩa sự kiện submit cho form
    form.addEventListener('submit',async(e)=>{
        // ngăn chặn hành vi tải trang
        e.preventDefault();
        
        // B3: Validate

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

        // B4: lấy dữ liệu
        const data = {
            username: inputUsername.value,
            password: inputPassword.value,
            name: inputName.value,
            avatar: inputAvatar.value,
            note: inputNote.value,
        }
        // console.log(data);

        // B5: update vào db
        const res = await updateUser(id,data)
        if(res.ok){
            window.location = 'list.html';
            alert("Cập nhật thành công")
        }
    })
}

submitUpdateUser();