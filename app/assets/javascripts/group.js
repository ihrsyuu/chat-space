$(function() {

  var search_list = $("#user-search-result");
  var search_list_add = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(text) {
    var html = `<div class="chat-group-user clearfix">${ text }</div>`
    search_list.append(html);
  }

  function appendUserNameAdd(user_name, user_id) {
     var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
      search_list_add.append(html);
  }

  $("#group_users").on("keyup", function() {
    var input = $("#group_users").val();

    if(input!==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = appendUser(user);
            $("#user-search-result").append(html);
          });
        } else {
          appendNoUser("一致する名前はありません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    }
  });

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendUserNameAdd(user_name, user_id);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function() {
    $(this).parent().remove();
  });

});
