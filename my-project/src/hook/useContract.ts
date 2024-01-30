import { useEffect, useState } from "react";
import { ProjectManager } from "tokamak-dapp-sdk/tonstarter";
import {
  ClaimInfo,
  ManageInfo,
  ProjectInfo,
  SaleInfo,
  Status,
  TimeInfo,
} from "../types";

export const useContract = () => {};

export const useTONStarterC = () => {};

export const useProjectInfo = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | undefined>(
    undefined
  );
  const [manageInfo, setManageInfo] = useState<ManageInfo | undefined>(
    undefined
  );
  const [saleInfo, setSaleInfo] = useState<SaleInfo | undefined>(undefined);
  const [timeInfo, setTimeInfo] = useState<TimeInfo | undefined>(undefined);
  const [claimInfo, setClaimInfo] = useState<ClaimInfo | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);

  const L2_TOKEN = process.env.REACT_APP_L2TOKEN;

  useEffect(() => {
    const fetchProjectInfo = async () => {
      const ProjectManagerSDK = new ProjectManager({
        chainId: 5050,
        l2Token: L2_TOKEN as string,
      });

      await ProjectManagerSDK.syncData();

      const {
        projectInfo,
        manageInfo,
        saleInfo,
        timeInfo,
        claimInfo,
        isSet,
        status,
      } = ProjectManagerSDK;

      // if (!isSet) {
      //   setProjectInfo(undefined);
      //   setManageInfo(undefined);
      //   setSaleInfo(undefined);
      //   setTimeInfo(undefined);
      //   setClaimInfo(undefined);
      //   return;
      // }

      if (
        projectInfo &&
        manageInfo &&
        saleInfo &&
        timeInfo &&
        claimInfo &&
        status
      ) {
        setProjectInfo(projectInfo);
        setManageInfo(manageInfo);
        setSaleInfo(saleInfo);
        setTimeInfo(timeInfo);
        setClaimInfo(claimInfo);
        setStatus(status);
      }
    };

    if (L2_TOKEN !== undefined) {
      fetchProjectInfo();
    }
  }, [L2_TOKEN]);

  return { projectInfo, manageInfo, saleInfo, timeInfo, claimInfo };
};
