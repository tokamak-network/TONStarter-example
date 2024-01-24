// your-script.js

import { execSync } from "child_process";
import fs from "fs";

const init = () => {
  // 폴더 생성
  const folderName = "myProject";
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  // 클론 명령어 실행 (git sparse-checkout 사용)
  execSync(
    `git clone --filter=blob:none https://github.com/tokamak-network/TONStarter-sdk.git ${folderName}`
  );
  process.chdir(folderName);
  // .git/info/sparse-checkout 파일에 원하는 디렉토리 명시
  fs.writeFileSync(".git/info/sparse-checkout", "packages/basic");
  // 추가적인 설정이 필요할 경우
  execSync("git config core.sparseCheckout true");
  // 다운로드 받은 파일을 가져옴
  execSync("git checkout main");
  console.log("go4");
  // 클론한 디렉토리로 이동
  //   process.chdir(folderName);

  //   // 프로젝트 시작 명령어 실행
  //   execSync("npm start");

  // myProject/packages/basic를 다른 경로로 이동

  const newPath = "test";
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath, { recursive: true });
  }
  fs.mkdirSync(newPath, { recursive: true });

  // myProject/packages/basic를 newPath로 이동
  fs.renameSync(`packages/basic`, `test`);

  // myProject 폴더 삭제
  fs.rmdirSync(folderName, { recursive: true });
};

init();
