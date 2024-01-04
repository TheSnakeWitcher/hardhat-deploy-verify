# hardhat-deploy-verify
These plugin adds a  `--verify` flag to the `deploy` task introduced by `hardhat-deploy`
to automatically verify deployed contracts. It works by fetching the deployed
contract address and arguments and then calling the `verify` task of 
`hardhat-verify`. These works only for contracts which use a deploy script with a
`tag` that matchs exactly the contract name. 
