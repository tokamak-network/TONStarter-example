import {
  CLI_Answer,
  DeployContractStep,
  DeployProject,
  DeployedProjectInfo,
  DeploymentError,
  I_StepListener,
  Params,
} from "../types";
import { animateEllipsis } from "../utils/consoleUI";
import createProjectL1 from "../contracts/deploy/0.create_project_L1";
import setTokenOnL2 from "../contracts/deploy/1.set_token_L2";

export class SetTokenOnL2 implements I_StepListener {
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

  async deployProject(step: DeployContractStep): Promise<DeployProject> {
    try {
      if (step !== "SetTokenOnL2") return { state: false };
      const deployedProject = await animateEllipsis(
        "Setting your token on L2...",
        () => setTokenOnL2(this.createProjectStatus.projectInfo),
        400
      );

      if (deployedProject.state) {
        this.updateStep("Done");
        return deployedProject;
      }
      this.updateStep("Error");
      throw new DeploymentError("Deployment failed");
    } catch (error) {
      if (error instanceof DeploymentError) {
        return error;
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
}
export class DeployProjectOnL1 implements I_StepListener {
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

  updateProjectInfo(projectInfo: DeployedProjectInfo) {
    this.createProjectStatus.setProjectInfo = projectInfo;
  }

  async deployProject(step: DeployContractStep): Promise<DeployProject> {
    try {
      if (step !== "CreateProjectOnL1") return { state: false };

      const deployedProject = await animateEllipsis(
        "Deploying a project on L1...",
        () => createProjectL1(this.createProjectStatus.cliAnswers),
        400
      );

      if (deployedProject.state && deployedProject.result) {
        this.updateProjectInfo(deployedProject.result);
        this.updateStep("SetTokenOnL2");
        return deployedProject;
      }
      this.updateStep("Error");
      throw new DeploymentError("Deployment failed");
      // return { state: false };
    } catch (error) {
      if (error instanceof DeploymentError) {
        return error;
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
}

export class CreateProject {
  private _isLoading: boolean;
  private _step: DeployContractStep;
  private _cliAnswers: CLI_Answer;
  private _stepListeners: I_StepListener[] = [];
  private _projectInfo: DeployedProjectInfo | undefined = undefined;

  constructor(answers: CLI_Answer) {
    this._isLoading = false;
    this._step = "CreateProjectOnL1";
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

  get projectInfo(): DeployedProjectInfo | undefined {
    return this._projectInfo;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }
  set setStep(step: DeployContractStep) {
    this._step = step;
    this.notifyStepChange(step);
  }

  set setProjectInfo(projectInfo: DeployedProjectInfo) {
    this._projectInfo = projectInfo;
  }

  addStepChangeListener(listener: I_StepListener[]): void {
    this._stepListeners.push(...listener);
  }

  private notifyStepChange(step: DeployContractStep): void {
    this._stepListeners.forEach((listener: I_StepListener) => {
      listener.deployProject(step);
    });
  }

  async start() {
    try {
      this.notifyStepChange(this._step);

      await new Promise<void>((resolve) => {
        const checkStep = () => {
          if (this._step === "Done" || this._step === "Error") {
            resolve();
          } else {
            setTimeout(checkStep, 100);
          }
        };

        checkStep();
      });

      return this._step === "Done";
    } catch (e) {
      throw e;
    }
  }
}
