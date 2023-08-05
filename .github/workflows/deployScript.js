// deployScript.js

const { CodeDeployClient, CreateDeploymentCommand } = require('@aws-sdk/client-codedeploy');

const createDeployment = async (commitHash) => {
  const client = new CodeDeployClient({ region: 'eu-west-3' });

  const params = {
    applicationName: 'CodeDeployAppNameWithASG',
    deploymentGroupName: 'CodeDeployGroupName',
    revision: {
      revisionType: 'GitHub',
      gitHubLocation: {
        repository: 'https://github.com/iqranawaz0/deploy-web-app-to-EC2-by-github-actions.git',
        commitId: commitHash,
      },
    },
    // Other deployment configuration parameters can be added as needed
  };

  try {
    const data = await client.send(new CreateDeploymentCommand(params));
    console.log('Deployment created:', data.deploymentId);
  } catch (error) {
    console.error('Error creating deployment:', error);
  }
};

// Call the deployment function with the commit hash
createDeployment(process.argv[2]);
