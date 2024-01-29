import { execSync } from "child_process";
import fs from "fs-extra";
import { spawn } from "cross-spawn";
import { DeployedProjectInfo } from "../types";

export const cloneTemplate = (projectInfo: DeployedProjectInfo) => {
  const folderName = "myProject";
  if (fs.existsSync(folderName)) {
    fs.rmSync(folderName, { recursive: true });
  }
  fs.mkdirSync(folderName);

  execSync(
    `git clone --filter=blob:none https://github.com/tokamak-network/TONStarter-templates.git ${folderName}`
  );
  process.chdir(folderName);
  fs.writeFileSync(".git/info/sparse-checkout", "packages/basic");
  execSync("git config core.sparseCheckout true");
  execSync("git checkout main");

  const newPath = "test";
  //   if (!fs.existsSync(newPath)) {
  //     fs.mkdirSync(newPath, { recursive: true });
  //   }
  //   fs.mkdirSync(newPath, { recursive: true });

  // myProject/packages/basic를 newPath로 이동
  fs.moveSync(`packages/basic`, `../../my-project`, { overwrite: true });

  process.chdir("../");

  // myProject 폴더 삭제
  fs.rmSync(folderName, { recursive: true });

  setTimeout(() => {
    process.chdir("../");
    process.chdir("my-project");

    const npmInstall = spawn("npm", ["install", "--verbose"]);

    npmInstall.stdout.on("data", (data) => {
      // Print the output to the console
      console.log(data.toString());
    });

    npmInstall.stderr.on("data", (data) => {
      // Print error output to the console
      console.error(data.toString());
    });

    npmInstall.on("close", (code) => {
      if (code === 0) {
        console.log("npm install completed successfully.");

        const envVariables = `
REACT_APP_MODE=DEV
REACT_APP_L2TOKEN=${projectInfo.l2Token}
REACT_APP_TITAN_PROVIDER=https://rpc.titan-goerli.tokamak.network
`;
        fs.writeFileSync(".env", envVariables, "utf-8");
        console.log(".env file created successfully.");

        // execSync("npm start");
        console.log("Running npm start...");
        const npmStart = spawn("npm", ["start", "--verbose"], {
          stdio: "inherit",
        });
        npmStart.on("close", (code) => {
          if (code === 0) {
            console.log("npm start completed successfully.");
          } else {
            console.error(`npm start failed with code ${code}`);
          }
        });
      } else {
        console.error(`npm install failed with code ${code}`);
      }
    });
  }, 1000);
};
