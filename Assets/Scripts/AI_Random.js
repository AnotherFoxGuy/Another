#pragma strict

@script RequireComponent (NavMeshAgent)
@script AddComponentMenu ("AI/AI Random")

public var MoveTo : Transform;
public var IdleTime = 2;
public var GodMode = false;
public var FootSteps : AudioClip;
public var SoundDead : AudioClip;

private var nextPath = 0.0;
private var TimeUntilLevelReload = Mathf.Infinity;
private var stoppingDistance = 1.5;
private var CurrText = "";
private var CanSee = false;
private var Used = true;
private var Called = true;
private var Killed = false;
private var agent: NavMeshAgent;
private var PlayerCam: GameObject;
private var FlashLight: Light;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	PlayerCam = GameObject.Find("Main Camera");
	FlashLight = PlayerCam.GetComponent(Light);
	agent.stoppingDistance = stoppingDistance;
	var RandomPosition = Vector3(Random.Range(-20.0, 20.0), Random.Range(0.0, 10.0), Random.Range(-20.0, 20.0));
	agent.SetDestination(RandomPosition);
}

function Update () {
	var hit: RaycastHit;
	var heading = MoveTo.position - transform.position;
	var distance = heading.magnitude;
	var direction = heading / distance;
	var targetDir = Camera.main.transform.position - transform.position;
	var forward = Camera.main.transform.forward;
	var angle = Vector3.Angle(targetDir, forward);
	var dist = Vector3.Distance(MoveTo.position, transform.position);
	if (!Physics.Raycast (transform.position, direction, hit, dist)) {
		CurrText = "I can see you";
		CanSee = true;
		if (FlashLight.enabled && angle > 150 && dist < 10){
			agent.Stop();
			nextPath = Time.time + IdleTime;
		}
		else{
			agent.SetDestination(MoveTo.position);
			PlaySoundIfNotPlaying(FootSteps);
			nextPath = Time.time + IdleTime;
		}
	}
	else{
		CurrText = "I can not see you";
		CanSee = false;
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

function OnTriggerStay (Player : Collider) {
	if(Player.gameObject.tag == "Player" && !GodMode && !Killed && CanSee){
		TimeUntilLevelReload = Time.time + 2;
		Killed = true;
	}
}

function OnGUI () {
  //GUI.Box (Rect (Screen.width-200, 25, 200, 60), CurrText);
		if(Killed){
			GUI.Box (Rect (Screen.width/2-100,Screen.height/2-30, 200, 60), "you are killed");
			PlaySoundIfNotPlaying(SoundDead);
		}
}

function PlaySoundIfNotPlaying(CurrentSound :AudioClip){
 	if (!audio.isPlaying){
		audio.clip = CurrentSound;
		audio.Play();
		//print("Play Sound");
	}
}
