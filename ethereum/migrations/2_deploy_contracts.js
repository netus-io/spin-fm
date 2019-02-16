var Token=artifacts.require('./Avatar.sol')
var Session=artifacts.require('./DJSession.sol')
//var Module23= artifacts.require('./Module23.sol')
module.exports = function(deployer) {
    deployer.then(async () => {
   let AA= await deployer.deploy(Token)
   await deployer.deploy(Session,AA.address)
 //await deployer.deploy(Module23,C.address)
})
};
