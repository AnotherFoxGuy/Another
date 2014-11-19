#pragma strict

public var LoadScene : String;
public var targetPoints : Transform[];

private var nextpoint = 0;
private var agent: NavMeshAgent;


function Start () {
  agent = GetComponent.<NavMeshAgent>();
  agent.SetDestination(targetPoints[0].transform.position);
}

function Update () {
  if (agent.remainingDistance < 0.5){
    nextpoint++;
    if (nextpoint == targetPoints.length){
      Application.LoadLevel (LoadScene);
    }
    else{
      agent.SetDestination(targetPoints[nextpoint].transform.position);
      print(nextpoint);
    }
  }
}
