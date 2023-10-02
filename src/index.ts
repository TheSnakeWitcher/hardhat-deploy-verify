import { task, subtask } from "hardhat/config";
import * as sources_names from "hardhat/utils/source-names"
import * as contracts_names from "hardhat/utils/contract-names"


const TASK_VERIFY = "verify";
const TASK_DEPLOY = "deploy";
const TASK_DEPLOY_VERIFY = `${TASK_DEPLOY}:${TASK_VERIFY}`;


task(TASK_DEPLOY)
    .addFlag("verify", "automatically verify deployed contract")
    .setAction(async function(args, hre, runSuper) {
        const verifyDeployedContractTask = hre.tasks[TASK_DEPLOY_VERIFY].name;

        await runSuper(args);

        if (args.verify) {
            await hre.run(verifyDeployedContractTask, args);
        }
    })


subtask(TASK_DEPLOY_VERIFY, "automatically verify a contract deployed with hardhat-deploy", async function(args, hre) {

    const contract_name = args.tags;
    const contract_path = sources_names.localSourceNameToPath(hre.config.paths.root, contract_name);
    const contract = contracts_names.getFullyQualifiedName(contract_path, contract_name);

    const deployment = await hre.deployments.get(contract_name);
    const address = deployment.address;
    const constructorArgsParams = JSON.stringify(deployment.args)
    // const constructorArgsParams = deployment.args

    // or `{TASK_VERIFY}:${TASK_VERIFY}`
    await hre.run(TASK_VERIFY, { address, contract, constructorArgsParams });
})
