import { CLI_Answer, DeployContractStep } from "../types";
import { animateEllipsis } from "../utils/consoleUI";
import createProjectL1 from "../contracts/deploy/0.create_project_L1";

type Params = any;

interface IDeploy {
  getParmas(CLI_Answer: CLI_Answer): Params;
  updateStep(step: DeployContractStep): void;
  //   deployProject(): Promise<boolean>;
  //     animateEllipsis(): {

  //   };
}

export class DeployProjectL1 implements IDeploy {
  private createProjectStatus: CreateProject;

  constructor(createProjectStatus: CreateProject) {
    this.createProjectStatus = createProjectStatus;
  }
  getParmas(): Params {
    const cliAnswers = this.createProjectStatus.cliAnswers;
    return cliAnswers;
  }

  updateStep(step: DeployContractStep) {
    this.createProjectStatus.setStep = step;
  }

  async deployProject(): Promise<boolean> {
    const deployedProject = await animateEllipsis(
      "Deploying a project on L1...",
      () => createProjectL1(this.createProjectStatus.cliAnswers),
      400
    );
    if (deployedProject) {
      this.updateStep(2);
    } else {
      this.updateStep(1);
    }

    return deployedProject;
  }
}

export class CreateProject {
  private _isLoading: boolean;
  private _step: DeployContractStep;
  private _cliAnswers: CLI_Answer;

  constructor(answers: CLI_Answer) {
    this._isLoading = false;
    this._step = 1;
    this._cliAnswers = answers;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get step(): DeployContractStep {
    return this._step;
  }

  get cliAnswers(): CLI_Answer {
    return this._cliAnswers;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }
  set setStep(step: DeployContractStep) {
    this._step = step;
  }
}
