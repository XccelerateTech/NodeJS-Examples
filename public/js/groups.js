$(()=>{
    $.get('/api/groups').then((data)=>{
        console.log(data);
        let groupsInfoContainer = $('#template-info-container').clone();
        let groupInfo = groupsInfoContainer.contents().find('p');
        data.forEach(e => {
            groupInfo.eq(0).html(e.name);
            $('#group-list').append(groupsInfoContainer.html());
        });
    });
})