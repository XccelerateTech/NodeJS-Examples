$(()=>{
    $.get('/api/users').then((data)=>{
        console.log(data);
        let usersInfoContainer = $('#users-info-container').clone();
        let userInfo = usersInfoContainer.contents().find('p');
        data.forEach(e => {
            userInfo.eq(0).html(e.first_name);
            userInfo.eq(1).html(e.last_name);
            userInfo.eq(2).html(e.email);
            $('#user-list').append(usersInfoContainer.html());
        });
    });
})