var Sess=artifacts.require('./DJSession.sol')
var Avatar=artifacts.require('./Avatar.sol')

var time=(new Date().getTime())
time=time/1000;
console.log(time + "tim")

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

contract("authTest", accounts => {



    it("creates a session", async () => {
        var DJS=await Sess.deployed()
        var Token=await Avatar.deployed()
        await Token.mint(accounts[1], 77,{from:accounts[0]})
        await Token.mint(accounts[2],33,{from:accounts[0]})
        console.log(await Token.createdTokens())
        DJS.createSession(time+10,time+600,1000,1000000000,5);
        console.log(await DJS.AllSessions(1))
        await DJS.register(1,1,{from:accounts[1],value:1000000000})
        await DJS.register(1,2,{from:accounts[2],value:1000000000})
        
        await DJS.upVote(1,1,{from:accounts[1]})
        await DJS.upVote(1,2,{from:accounts[2]})
        console.log(await DJS.AllSessions(1))
        await DJS.withdrawSessionEarnings(1,{from:accounts[0]})





    })   
})

