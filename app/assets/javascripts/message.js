$(function(){

  function buildHTML(message){
    var html = `<div class="mainblock__chats__chat">
                  <div class="mainblock__chats__chat__nickname">${message.user_name}</div>
                  <div class="mainblock__chats__chat__date">${message.created_at}</div>`
                  if(message.content !== null){html = $(html).append(`<div class="mainblock__chats__chat__message">${message.content}</div>`)}
                  if(message.image !== null){html = $(html).append(`<div class="mainblock__chats__chat__image"><img src =${message.image}></div>`)}
               `</div>`
    return html;

  }
  function scroll() {
    $('.mainblock__chats').animate({scrollTop: $('.height')[0].scrollHeight},0);
  }

  $('#js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.height').append(html)
      $('.mainblock__form__message').val('')
      $('.hidden').val('')
      $('.mainblock__form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function() {
      alert('error')
      $('.mainblock__form__submit').prop('disabled', false);
    })
  });

  setInterval(function() {
    $.ajax({
      url: location.href.json,
    })
    .done(function(json) {
      var insertHTML = '';
      json.messages.forEach(function(message) {
        insertHTML += buildHTML(message);
      });
      $('.chat-wrapper').append(insertHTML);
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  });

});






