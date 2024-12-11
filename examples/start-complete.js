import temporal from 'k6/x/temporal';
import { scenario } from 'k6/execution';

export const options = {
    scenarios: {
      start_complete: {
        executor: 'shared-iterations',
        iterations: '1',
        vus: 1, 
      },
    },
};
const certpath = '../cert.pem'; //Specify the cert path
const keypath = '../client.key';//Specify the key path

const client = temporal.newClient({
  host_port: 'localhost:7233',
  namespace: 'temporal',
  certpath: certpath,
  keypath: keypath
});
console.log("Client: ",client)
export default function () {
  const workflowID = 'test_172';//unique id..can be generated using uuid
  const result = client.startWorkflow({
      id: workflowID,
      task_queue: 'Test_Queue',
  },'StartLoadTestWorkflow',
  {"Test":"Test"}
);

const result1 = client.signalWithStartWorkflow(
  "workflowID",
  "testSignal",
  "sample",
  {
          id: workflowID,
          task_queue: "Test_Queue",
      },
  "StartLoadTestWorkflow",
  "initialdata"
);
  console.log(`Started workflow with ID: ${workflowID}, Run ID: ${result.runID}`);
  console.log(`Started workflow with ID: ${workflowID}, Run ID: ${result1.runID}`); 
    client.close()
};