import React, { MouseEventHandler, useContext, useMemo } from "react";
import { latestSchemaVersion } from "../constants";
import { useNavigate } from "react-router";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, useQuery } from "@apollo/client";
import { NewClient, parseSubgraphName, toPercent } from "../utils";
import { ProtocolQuery } from "../queries/protocolQuery";
import { SubgraphStatusQuery } from "../queries/subgraphStatusQuery";
import { useEffect } from "react";
import { styled } from "../styled";
import { alpha, Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import DeploymentsContext from "./DeploymentsContext";
import { NetworkLogo } from "../common/NetworkLogo";

const DeploymentBackground = styled("div")`
  background: rgba(22, 24, 29, 0.95);
  border-radius: 8px;
  flex-grow: 2;
`;

const StyledDeployment = styled(Card)<{
  $styleRules: { schemaOutdated: boolean; nonFatalErrors: boolean; fatalError: boolean; success: boolean };
}>(({ $styleRules, theme }) => {
  let statusColor = "";
  if ($styleRules.fatalError) {
    statusColor = theme.palette.error.main;
  } else if ($styleRules.schemaOutdated || $styleRules.nonFatalErrors) {
    statusColor = theme.palette.warning.main;
  } else if ($styleRules.success) {
    statusColor = theme.palette.success.main;
  }

  const indexedStyles =
    ($styleRules.fatalError || $styleRules.success) &&
    `
    .indexed {
      color: ${statusColor};
    }
  `;
  return `
    background: rgba(22,24,29,0.9);
    background: linear-gradient(0deg, rgba(22,24,29,0.9) 0%, ${statusColor} 95%);
    padding: 1px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    
    &:hover {
      box-shadow: 0 0 2px 1px ${alpha(theme.palette.primary.main, 0.6)};
    }
    
    ${indexedStyles}
  `;
});

const CardRow = styled("div") <{ $warning?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  ${({ $warning, theme }) => $warning && `color: ${theme.palette.warning.main}`};
`;

const CardButton = styled(Button)`
  width: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

interface DeploymentProps {
  networkName: string;
  deployment: string;
  subgraphID: string;
  clientIndexing: ApolloClient<NormalizedCacheObject>;
}

// This component is for each individual subgraph
export const Deployment = ({ networkName, deployment, subgraphID, clientIndexing }: DeploymentProps) => {
  const deploymentsContext = useContext(DeploymentsContext);
  const navigate = useNavigate();
  const navigateToSubgraph = (url: string) => () => {
    navigate(`subgraph?endpoint=${url}&tab=protocol`);
  };
  // Pull the subgraph name to use as the variable input for the indexing status query
  const subgraphName = parseSubgraphName(deployment);
  const deploymentId = deployment.split("id/")[1];
  const { data: status, error: errorIndexing, loading: statusLoading } = useQuery(SubgraphStatusQuery(deployment), {
    variables: { subgraphName, deploymentIds: [deploymentId ? deploymentId : ""] },
    client: clientIndexing,
  });
  let statusData = status?.indexingStatusForCurrentVersion;
  let { nonFatalErrors, fatalError, synced } = statusData ?? {};
  if (status?.indexingStatuses) {
    statusData = status?.indexingStatuses[0];
    synced = statusData?.synced ?? null;
    fatalError = statusData?.fatalError ?? null;
    nonFatalErrors = statusData?.nonFatalErrors ?? [];
  }

  const client = useMemo(() => NewClient(deployment), [deployment]);
  const { data, error, loading } = useQuery(ProtocolQuery, {
    client,
  });

  const protocol = useMemo(() => data?.protocols[0], [data]);
  const { schemaVersion } = protocol ?? {};

  useEffect(() => {
    if (error || errorIndexing) {
      console.log(deployment, "DEPLOYMENT ERR", error, errorIndexing, status, statusData, subgraphName);
    }
  }, [error]);

  const { schemaOutdated, indexedSuccess } = useMemo(() => {
    return {
      schemaOutdated: schemaVersion && schemaVersion !== latestSchemaVersion,
      indexedSuccess: synced && schemaVersion === latestSchemaVersion,
    };
  }, [schemaVersion, fatalError, synced]);
  if (loading || statusLoading) {
    return <CircularProgress sx={{ margin: 6 }} size={50} />;
  }

  if (!statusData && !statusLoading) {
    let errorMsg = null;
    if (errorIndexing) {
      errorMsg = (
        <Box marginTop="10px" gap={2} alignItems="center">
          <span>Indexing status could not be pulled: "{errorIndexing.message.slice(0, 100)}..."</span>
        </Box>
      );
    }
    return (
      <StyledDeployment
        onClick={navigateToSubgraph(deployment)}
        sx={{ width: "70%" }}
        $styleRules={{
          schemaOutdated,
          nonFatalErrors: false,
          fatalError: false,
          success: false,
        }}
      >
        <DeploymentBackground>
          <CardContent>
            <Box display="flex" gap={3} alignItems="center">
              <NetworkLogo network={networkName} />
              <Typography variant="h5" align="center">
                {networkName}
              </Typography>
            </Box>
            <Box marginTop="10px" gap={2} alignItems="center">
              <span>{deployment}</span>
            </Box>
            {errorMsg}
          </CardContent>
        </DeploymentBackground>
      </StyledDeployment>
    );
  }
  const indexed = synced
    ? 100
    : toPercent(
      statusData.chains[0].latestBlock.number,
      statusData.chains[0].chainHeadBlock.number,
    );

  const showErrorModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    deploymentsContext.setErrorDialogData({
      deployment,
      network: networkName,
      fatalError,
      nonFatalErrors,
      subgraphName: subgraphID,
    });
    deploymentsContext.showErrorDialog(true);
  };

  return (
    <StyledDeployment
      onClick={navigateToSubgraph(deployment)}
      $styleRules={{
        schemaOutdated,
        nonFatalErrors: nonFatalErrors.length > 0,
        fatalError: !!fatalError,
        success: indexedSuccess,
      }}
    >
      <DeploymentBackground>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center">
            <NetworkLogo network={networkName} />
            <Typography variant="h6" align="center">
              {networkName}
            </Typography>
          </Box>
          <CardRow className="indexed">
            <span>Indexed:</span> <span>{indexed}%</span>
          </CardRow>
          <CardRow>
            <span>Latest Block:</span>{" "}
            <span>{statusData.chains[0].latestBlock.number}</span>
          </CardRow>
          <CardRow>
            <span>Current chain block:</span>
            <span>{statusData.chains[0].chainHeadBlock.number}</span>
          </CardRow>
          <CardRow $warning={schemaOutdated}>
            <span>Schema version:</span> <span>{protocol?.schemaVersion || "N/A"}</span>
          </CardRow>
          <CardRow>
            <span>Subgraph version:</span> <span>{protocol?.subgraphVersion || "N/A"}</span>
          </CardRow>
          <CardRow $warning={nonFatalErrors.length > 0}>
            <span>Non fatal error count:</span> <span>{nonFatalErrors.length}</span>
          </CardRow>
          <CardRow>
            <span>Entity count:</span>{" "}
            <span>{parseInt(statusData.entityCount).toLocaleString()}</span>
          </CardRow>
        </CardContent>
        {(nonFatalErrors.length > 0 || fatalError) && (
          <CardButton variant="contained" color="error" onClick={showErrorModal}>
            View Errors
          </CardButton>
        )}
      </DeploymentBackground>
    </StyledDeployment>
  );
};
