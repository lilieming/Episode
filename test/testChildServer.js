var myutil = require('../lib/myutil');

var LOG         = myutil.LOG;
var ERROR       = myutil.ERROR;

var op = require('./op');

var Socket      = require('../lib/socket');

var connSocket  = null;

var state = 0;

function succ(session)
{
    //var inst = new op.testMessage({hello:"hello"});
    //session.sendByteBuffer(1, inst.toBuffer());
}

function err(sockObj)
{
    ERROR("error");
}

function msgCB(sockObj, msgID, buf)
{
    if(msgID == 1){
		var inst = op.testRPCMessage.decode(buf);

		var msg = new op.testRPCMessage_RET({index: inst.index});
		sockObj.sendByteBuffer(2, msg.toBuffer());
	}    
}

var connectServer = function(ip, port){
    var connOption = {}
    connOption.client  = true;
    connOption.port    = port;
    connOption.host    = ip;
    connOption.errCB   = err;
    connOption.connSuccCB = succ;
    connOption.msgCB    = msgCB;

    connSocket         = new Socket(connOption);

    LOG("connecting "+ip+" "+port);
}

connectServer("127.0.0.1", 1234);
