$(document).ready(function() {
    scrollToBottom();
    setInterval(function() {
        if(firstClick){
            ViewMessage(FadeIdItem);
        }
    },1500);
    var MessageVue = new Vue({
        el:'#wt-main',
        data:{
            items: [],
            result: []
        },
        mounted: function(){
            var self = this;
            $.ajax({
                url: "https://willingly.tk/inc/php/Get_ChatList.php",
                method:"GET",
                dataType:"JSON",
                success: function(data){
                    self.items = data.Data;
                },
                error: function(a,b,g){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Bir şeyler yanlış gitti!'
                    });            
                }
            });
            $.ajax({
                url: "https://willingly.tk/inc/php/Get_UserInformation.php",
                method: "GET",
                dataType: "JSON",
                withCredentials : true,
                success: function(data) {
                    self.result = data.Data[0];
                    console.log(data.Data[0]);
                },
                error: function(a,r,g){
                    console.log(a);
                    console.log(r);
                    console.log(g);
                }
            });
        }
    });
});

var firstClick = false;
var FadeIdItem;
var shouldScroll;
var messagesList = document.getElementById("msgList");
function ViewMessage(a){
    var id = $(a).find('div input').val()
    FadeIdItem = a;
    firstClick = true;
    
            $.ajax({
                url:"https://willingly.tk/inc/php/Get_ChatMessages.php",
                method:"POST",
                data:{ChatRoomID:id},
                dataType:"JSON",
                success:function(data){
                    shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;

                    var main = document.getElementById("msgList");
                    main.innerHTML = "";
    
                    for(var i=0;i< data.Data.length;i++){
                        if(i == 0)
                        {
                            if(data.Data[i].Sender == data.Data[i].Reciver){
                                if(data.Data[i].IsRead == true)
                                {
                                    a.classList.remove("wt-dotnotification");
                                }
                                else{
                                    a.classList.add("wt-dotnotification");
                                }                                    
                                    main.innerHTML += "<div class='wt-offerermessage'> <figure><img src='/../../../assets/images/messages/img-12.jpg' alt='image description'></figure> <div class='wt-description'> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                            }
                            else{
                                if(data.Data[i].IsRead == true)
                                {
                                    a.classList.remove("wt-dotnotification");
                                    main.innerHTML += "<div class='wt-memessage wt-readmessage'> <figure><img src='/../../../assets/images/messages/img-11.jpg' alt='image description'></figure> <div class='wt-description'> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                                }
                                else{
                                    a.classList.add("wt-dotnotification");
                                    main.innerHTML += "<div class='wt-memessage'> <figure><img src='/../../../assets/images/messages/img-11.jpg' alt='image description'></figure> <div class='wt-description'> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                                }
                            }
                        }
                        else{
                            if(data.Data[i].Sender == data.Data[i].Reciver){
                                if(data.Data[i].IsRead == true)
                                {
                                    a.classList.remove("wt-dotnotification");
                                    main.innerHTML += "<div class='wt-offerermessage'> <figure><img src='/../../../assets/images/messages/img-12.jpg' alt='image description'></figure> <div class='wt-description'> <div class='clearfix'></div> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                                }
                                else{
                                    a.classList.add("wt-dotnotification");
                                    main.innerHTML += "<div class='wt-offerermessage'> <figure><img src='/../../../assets/images/messages/img-12.jpg' alt='image description'></figure> <div class='wt-description'> <div class='clearfix'></div> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                                }
                            }
                            else{
                                if(data.Data[i].IsRead == true)
                                {
                                    a.classList.remove("wt-dotnotification");
                                    main.innerHTML += "<div class='wt-memessage wt-readmessage'> <figure><img src='/../../../assets/images/messages/img-11.jpg' alt='image description'></figure> <div class='wt-description'> <div class='clearfix'></div> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                                }
                                else{
                                    a.classList.add("wt-dotnotification");
                                    main.innerHTML += "<div class='wt-memessage'> <figure><img src='/../../../assets/images/messages/img-11.jpg' alt='image description'></figure> <div class='wt-description'> <div class='clearfix'></div> <p>"+data.Data[i].Text+"</p> <div class='clearfix'></div> <time datetime='2017-08-08'>January 12th, 2011</time> </div> </div>";
                                }
                            }
                        }
                    }

                    if (!shouldScroll) {
                        scrollToBottom();
                      }
                },
                error:function(a,b,g){
                    Swal.fire("Hatalı İşlem");
                }
        });
}

function scrollToBottom() {
    messagesList.scrollTop = messages.scrollHeight;
  }

function SendMessage(){
    var t1 = document.getElementsByName("reciverIds")[0].value;
    var t2 = document.getElementsByName("chatIds")[0].value;
    var msg = document.getElementById("msgBox").value;

    $(".wt-adcontent input");
    $.ajax({
        url:"https://willingly.tk/inc/php/Insert_NewMessage.php",
        method:"POST",
        data:{Text:msg,Reciver:t1,ChatID:t2},
        dataType:"JSON",
        success:function(data){
            if(data.Status == true)
            Swal.fire("Mesaj Gönderildi");
            else Swal.fire("Bilinmeyen bir hata oluştu");

        },
        error:function(a,b,g){
            Swal.fire("Bilinmeyen bir hata oluştu");
        }
    });
}