$(function() {

  var search_list = $("#user-search-result");

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

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input)

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

});
