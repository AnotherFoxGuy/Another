//UnnamedGameProject

//@script RequireComponent (NavMeshAgent)
//@script RequireComponent ()

public var MoveTo : Transform;
public var IdleTime = 2;

/*
public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var runAnimation : AnimationClip;
public var jumpPoseAnimation : AnimationClip;
*/
private var nextPath = 0.0;

private var stoppingDistance = 1.5;

private var CurrText = "";
private var Used = true;
private var Called = true;
private var agent: NavMeshAgent;
private var NoKill = true;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	agent.stoppingDistance = stoppingDistance;
	var RandomPosition = Vector3(Random.Range(-20.0, 20.0), Random.Range(0.0, 10.0), Random.Range(-20.0, 20.0));
	agent.SetDestination(RandomPosition);
}

function Update () {
	var hit: NavMeshHit;
		if (!agent.Raycast(MoveTo.position, hit)) {
			agent.SetDestination(MoveTo.position);
			CurrText = "I can see you";
		}
		else{
				CurrText = "I can't see you";
		}
		if (Time.time > nextPath) {
			var RandomPosition = Vector3(Random.Range(-20.0, 20.0), Random.Range(0.0, 10.0), Random.Range(-20.0, 20.0));
			agent.SetDestination(RandomPosition);
			//print(RandomPosition+" "+nextPath);
			nextPath = Mathf.Infinity;
		}
		if (agent.remainingDistance <= stoppingDistance && !Called) {
			nextPath = Time.time + IdleTime;
			//print(nextPath);
			Called = true;
		}
		if (agent.remainingDistance >= stoppingDistance && Called) {
			Called = false;
		}
		Debug.DrawLine (agent.destination, transform.position);
}

function OnTriggerEnter (player : Collider) {
  if(player.gameObject.tag == "Player" && !NoKill)
    Application.LoadLevel(Application.loadedLevel);
}

function OnGUI () {
    GUI.Box (Rect (Screen.width-200, 25, 200, 60), CurrText);
}
