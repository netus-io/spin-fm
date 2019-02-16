pragma solidity ^0.4.24;
import './Avatar.sol';

contract DJSession{
Avatar a;
mapping(address=>bool) public registeredDJ;
mapping(uint=>Session) public AllSessions;
mapping(uint=>address) public SessionOwner;
uint public totalSessions;

constructor(address tokenaddress){
a=Avatar(tokenaddress);
}
modifier inSession(uint s){
require((now>AllSessions[s].start) &&(now<AllSessions[s].end));
_;
}
event SessionCreated(uint start,uint end,uint price,address creator);

struct Session{
uint start;
uint end;
uint totalAttendees;
uint maxAttendees;
uint price;
uint votesPerTicket;
mapping(uint=>uint) ticketvotes;
//maps an upvote to a time in seconds
mapping(uint=>uint) upVotes;
//maps a downvote to time in seconds
mapping(uint=>uint) downVotes;

uint totalVotes;

mapping(uint=>bool) registeredUser;
address creator;
uint earnings;

uint totalUpVotes;

}
function getUpvotes(uint s) constant returns(uint){
    return AllSessions[s].totalUpVotes;
}
function getDownvotes(uint s) constant returns(uint){
    return (AllSessions[s].totalVotes-AllSessions[s].totalUpVotes);
}
function OwnsSession(uint s) constant returns(bool){
      return SessionOwner[s]==msg.sender;
}
function UpVotesInInterval(uint s,uint e,uint sess) returns(uint total){
    for(uint i=s;i<=e;i++){
        total+=AllSessions[sess].upVotes[i];
    }

}

function DownVotesInInterval(uint s,uint e,uint sess) returns(uint total){
    for(uint i=s;i<=e;i++){
        total+=AllSessions[sess].downVotes[i];
    }
    
}
function createSession(uint _start,uint _end,uint _maxAttendees,uint _price,uint _votesPerTicket){
    require(now<_start);
    AllSessions[totalSessions+1]=Session(_start,_end,0,_maxAttendees,_price,_votesPerTicket,0,msg.sender,0,0);
    SessionOwner[totalSessions+1]=msg.sender;
    totalSessions=totalSessions+1;
    emit SessionCreated( _start, _end, _price,msg.sender);
}

function upVote(uint session,uint token ){
 require(AllSessions[session].registeredUser[token]==true);  
 require(a.ownerOf(token)==msg.sender);
 require(AllSessions[session].ticketvotes[token]<AllSessions[session].votesPerTicket);
 AllSessions[session].ticketvotes[token]+=1;
 AllSessions[session].upVotes[token]+=1;
 AllSessions[session].totalVotes+=1;
 AllSessions[session].totalUpVotes+=1;
 

}

function downVote(uint session,uint token){
 require(AllSessions[session].registeredUser[token]==true);  
 require(a.ownerOf(token)==msg.sender);
 require(AllSessions[session].ticketvotes[token]<AllSessions[session].votesPerTicket);
 AllSessions[session].ticketvotes[token]+=1;
 AllSessions[session].downVotes[token]+=1;
 AllSessions[session].totalVotes+=1;
}

function transferRegistration(uint session,uint token,uint token2){
 require(AllSessions[session].registeredUser[token]==true);  
 require(a.ownerOf(token)==msg.sender);
 AllSessions[session].registeredUser[token]=false;
 AllSessions[session].registeredUser[token2]=true;
}

function register(uint session,uint token) payable{
    require(msg.value>=AllSessions[session].price);
    require(a.ownerOf(token)==msg.sender);
    require(AllSessions[session].registeredUser[token]==false);
    require(AllSessions[session].totalAttendees<AllSessions[session].maxAttendees);
    AllSessions[session].registeredUser[token]=true;
    AllSessions[session].totalAttendees+=1;
    AllSessions[session].earnings+=msg.value;
}

function withdrawSessionEarnings(uint s){
require(AllSessions[s].creator==msg.sender);
    uint value=AllSessions[s].earnings;

    AllSessions[s].earnings=0;
    msg.sender.transfer(value);
}

}