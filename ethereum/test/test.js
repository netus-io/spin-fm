

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
        function compare(object,object2){

            for(var i=0;i<object.length;i++){
                if(typeof(object[i])=='string'){
                    //console.log(object[i],object2[i])
                    //console.log(i)
                    console.log("teste equality of property"+i)
                    console.log(object[i]===object2[i])
                }
                
                else{
                    //console.log(object[i].c[0],object2[i].c[0])
                    //console.log(i)
                    console.log("teste equality of property"+i)
                    console.log(object[i].c[0]===object2[i].c[0])
                }
                
            }
        }
        var DJS=await Sess.deployed()
        var Token=await Avatar.deployed()
        await Token.mint(accounts[1], 77,{from:accounts[0]})
        await Token.mint(accounts[2],33,{from:accounts[0]})
        await Token.mint(accounts[1], 77,{from:accounts[0]})
        await Token.mint(accounts[2],33,{from:accounts[0]})
        console.log(await Token.createdTokens())
        console.log(await Token.tokenOfOwnerByIndex(accounts[2],1)+ "second TOken ID")
        DJS.createSession("Hot Ham",time+10,time+600,1000,1000000000,5);
        console.log(await DJS.AllSessions(1))
        await DJS.register(1,1,{from:accounts[1],value:1000000000})
        await DJS.register(1,2,{from:accounts[2],value:1000000000})
        
        await DJS.upVote(1,1,{from:accounts[1]})
        await DJS.upVote(1,2,{from:accounts[2]})
        let array=await DJS.AllSessions(1)
        await DJS.upVote(1,1,{from:accounts[1]})
        await DJS.upVote(1,2,{from:accounts[2]})
        let array2=await DJS.AllSessions(1)
       
        compare(array,array2)
        await DJS.withdrawSessionEarnings(1,{from:accounts[0]})





    })   
})

