$(function(){
$(document).on('turbolinks:load', function() {

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

var interval = setInterval(function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var lastMessageId = $('.mainblock__chats__chat:last').data('messageId');
    $.ajax({
      url: location.href,
      type: "GET",
      data: {id: lastMessageId},
      dataType: "json"
    })
    .done(function(data) {
      data.forEach(function(message) {
      var html = buildHTML(message);
      $('.height').append(html);
      scroll()
      })
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }} , 5000 );

})
});

