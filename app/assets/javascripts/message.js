$(function(){
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class=message>
                 <div class="upper-message">
                   <div class="upper-message__user-name">
                   ${message.user_name}
                   </div>
                   <div class="upper-message__date">
                   ${message.date}
                   </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    $('.messages').append(html); 
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action');
    $.ajax({ 
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      buildHTML(message);
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
    })
    .fail(function(){
      alert('メッセージが入力されていません');
    })
    return false;
  })
});
