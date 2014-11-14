#pragma strict

@script RequireComponent (NavMeshAgent)

public var MoveTo : Transform;
public var IdleTime = 2;
public var NoKill = false;

/*
public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var runAnimation : AnimationClip;
public var jumpPoseAnimation : AnimationClip;
*/

private var nextPath = 0.0;
private var TimeUntilLevelReload = Mathf.Infinity;
private var stoppingDistance = 1.5;
private var CurrText = "";
private var Used = true;
private var Called = true;
private var Killed = false;
private var agent: NavMeshAgent;


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
			CurrText = "I can not see you";
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
		if (Time.time > TimeUntilLevelReload) {
			Application.LoadLevel(Application.loadedLevel);
		}
	Debug.DrawLine (agent.destination, transform.position);
}

function OnTriggerEnter (player : Collider) {
  if(player.gameObject.tag == "Player" && !NoKill){
		TimeUntilLevelReload = Time.time + 2;
		Killed = true;
	}
}

function OnGUI () {
    GUI.Box (Rect (Screen.width-200, 25, 200, 60), CurrText);
		if(Killed){
			GUI.Box (Rect (Screen.width/2-100,Screen.height/2-30, 200, 60), "you are kill");
		}
}
