$(()=>{
    $.get('/api/users').then((data)=>{
        console.log(data);
    });
})