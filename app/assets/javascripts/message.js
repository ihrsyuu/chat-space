$(function(){
  function buildHTML(message){
    var html = `<div class="mainblock__chats__chat">
                  <div class="mainblock__chats__chat__nickname">
                    ${message.user_name}
                  </div>
                  <div class="mainblock__chats__chat__date">
                    ${message.created_at}
                  </div>`
                    if(message.content !== "" || message.content === null){
                      html = $(html).append(`<div class="mainblock__chats__chat__message">${message.content}</div>`)
                    }
                    if(message.image !== "" || message.image === null){
                      html = $(html).append(`<div class="mainblock__chats__chat__image"><img src =${message.image}></div>`)
                    }
                `</div>`
    return html;
  }
  $('#js-form').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      disabled: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.mainblock__chats').append(html)
      $('.mainblock__form__message').val('')
      $('.hidden').val('')
    })
    .fail(function() {
      alert('error');
    });
  });
});
