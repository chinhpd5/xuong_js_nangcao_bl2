// module: import , export
// import myName from '../../api/user.js'
// import {age,home} from '../../api/user.js'

// console.log(myName);
// console.log(age);
// console.log(home);

import {getAllUsers,deleteUser} from '../../api/user.js'

async function renderTableUser() {
    // B1: Lấy dữ liệu danh sách user
    const users = await getAllUsers();
    // console.log(users);

    // B2: Đổ dữ liệu ra table
    const trElements = users?.map((item,index)=>{
        return `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${item.name}</td>
                <td>${item.username}</td>
                <td><img style="height:50px" src="${item.avatar}" alt=""></td>
                <td>${item.note}</td>
                <td>
                    <button data-id="${item.id}" class="btn-delete btn btn-danger">Xóa</button>
                    <a href="edit.html?id=${item.id}" class=" btn btn-warning">Sửa</a>
                </td>
            </tr>
        `
    }).join('');

    const tbodyElement = document.querySelector('tbody');
    tbodyElement.innerHTML = trElements

    // xử lý logic xóa
    handleDelete()

}

renderTableUser();


function handleDelete(){
    // B1: lấy danh sách toàn bộ nút xóa (querySelectorAll)
    const btnDeletes = document.querySelectorAll('.btn-delete');
    // console.log(btnDeletes);

    // B2: khai báo sự kiện click cho từng nút xóa
    btnDeletes.forEach(item=>{
        // console.log(item);
        item.addEventListener('click',async ()=>{
            // console.log('click!!!');
            if(window.confirm("Bạn có chắc chắn muốn xóa?")){
                // B3: Lấy id từ data-id của nút xóa
                const id = item.dataset.id
                // console.log(id);
                
                // B4: Xóa
                const res = await deleteUser(id);
                if(res.ok){
                    alert("Xóa thành công")
                }
            }
        })
    })
    
}

