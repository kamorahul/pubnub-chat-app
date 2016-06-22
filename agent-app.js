/**
 * Created by rahul on 21/6/16.
 */

var data = "";
(function(){

    pubnub = PUBNUB({
        publish_key : 'XXXX',
        subscribe_key : 'XXXX'
    })
    myName = "agent-"+pubnub.uuid();

    pubnub.subscribe({
        channel : 'available_agent',
        uuid : myName,
        state: {
            privateChannel: myName,
            name : myName

        },
        callback: function(m){
            // var output =  pubnub.$('output')
            // output.innerHTML += JSON.stringify(m) + myName;
            // var response = prompt("New User Connected Wana Connect ");
            // if(response == "yes" || response == "y" ){
            //     if(m.privateChannel){
            //
            //             var message = "Hello "+ m.userid + "  i  " + myName   + "   how can i help you ? "
            //             var data = {name :myName, msg : message }
            //             pubnub.subscribe({
            //                 channel : m.privateChannel,
            //                 callback: function(m){
            //                     console.log(m);
            //                 }
            //             })
            //             pubnub.publish({
            //                 channel  : m.privateChannel,
            //                 message   : message,
            //                 callback  : function(e) {
            //                     console.log( "SUCCESS!", e );
            //                 },
            //                 error     : function(e) {
            //                     console.log( "FAILED! RETRY PUBLISH!", e );
            //                 }
            //             })
            //         }
            //     }
            // }
    }
    })
    console.log("MyName >>>"+ myName)
    pubnub.subscribe({
        channel : myName,

        callback: function(m){
            console.log("m >> >>> "+m)
            var ele = document.getElementById("messages");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(m));
            // li.setAttribute("id",arr[i].uuid);
            // li.setAttribute("onClick", "ConnectTOAgent(this)");
            ele.appendChild(li);
        },
        message: function(m){ // message reach at callback
            console.log("message"+JSON.stringify(m))

        }
    })

})();
