$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =  
         `  <div class="chat-main__message-list__info">
            <div class="chat-main__message-list__info__member">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__info__create-at">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__messages">
            <p class="chat-main__message-list__messages__content">
              ${message.content}
            </p>
            <img class="chat-main__message-list__messages__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list__info">
          <div class="chat-main__message-list__info__member">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__info__create-at">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__messages">
          <p class="chat-main__message-list__messages__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.chat-main__message-form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form__send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});