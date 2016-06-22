var users ={};
var  data = ""

var currentChannel = "";

var message = {
    data:  data ,
    userid : "paytm_user",

};
(function(){
    pubnub = PUBNUB({
        publish_key : 'XXXX',
        subscribe_key : 'XXXX'
    })
    var UUID = "the_random_user";
    var output  = pubnub.$('output');
    pubnub.here_now({
        state:true,
        channel : 'available_agent',
        callback: function(m){
            var arr  = m.uuids;

            console.log("THe Following agents are there !!",JSON.stringify(m))
            for(var i=0;i<arr.length;i++){
                var ul = document.getElementById("agent-list");
                var li = document.createElement("li");
                if(arr[i].state)
                li.appendChild(document.createTextNode(arr[i].state.name));
                li.setAttribute("id",arr[i].uuid);
                li.setAttribute("onClick", "ConnectTOAgent(this)");
                ul.appendChild(li);
                users[arr[i].uuid]  = arr[i].state
            }
        },
        });


})();

function ConnectTOAgent(e){
    var att =  e.id;
    currentChannel = users[att].privateChannel;
    console.log("Current Channel >> "+ currentChannel);
    // console.log("call reached !!" + JSON.stringify(att))
    pubnub.subscribe({
        channel : users[att].privateChannel,
        callback : function(m){
            console.log("m >> >>> "+m)
            var ele = document.getElementById("messages");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(m));
            // li.setAttribute("id",arr[i].uuid);
            // li.setAttribute("onClick", "ConnectTOAgent(this)");
            ele.appendChild(li);
        }
    })
    console.log(JSON.stringify(users))
    pubnub.publish({
        channel   : users[att].privateChannel,
        message   : "paytm_user is Typing....",
        callback  : function(e) {
            // var output =  pubnub.$('output')
            // output.innerHTML += "Publish OutPut : "+JSON.stringify(e);
        },
        error     : function(e) {
            console.log( "FAILED! RETRY PUBLISH!", e );
        }
    });

}
