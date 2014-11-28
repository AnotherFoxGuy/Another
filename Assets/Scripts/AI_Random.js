#pragma strict


/*
if(CanSeeChance(99))
CurrText = "I can see you";
else
CurrText = "I can not see you";


*/
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
private var CurrText = "Some text";
private var CanSee = false;
private var Used = true;
private var Called = true;
private var Killed = false;
private var agent: NavMeshAgent;
private var PlayerCam: GameObject;
private var FlashLight: Light;
private var Player: GameObject;
private var Playercontroller : CharacterController ;
private var PreviousseeChance = 0 ;
private var HaveSee = false ;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	PlayerCam = GameObject.Find("Main Camera");
	FlashLight = PlayerCam.GetComponent(Light);
	Player = GameObject.Find( "First Person Controller");
	Playercontroller = Player.GetComponent(CharacterController);
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
	var playerspeed = Mathf.Abs(Playercontroller.velocity.x)+ Mathf.Abs(Playercontroller.velocity.z);
	var agentspeed = Mathf.Abs(agent.velocity.x)+ Mathf.Abs(agent.velocity.z);
	var seeChance = 0;
	//seeChance+= dist;
	//seeChance+= Mathf.Abs(Playercontroller.velocity.x + Playercontroller.velocity.z)*2;
	if (playerspeed > 10)
		seeChance+=30;
	else if (playerspeed > 5)
		//seeChance+=10;
	if (!Physics.Raycast (transform.position, direction, hit, dist)){
		if(Playercontroller.height <1)
			seeChance+=10;
		else
			seeChance+=90;
		if(FlashLight.enabled)
			seeChance+=20;
	}
	if (CanSeeChance(seeChance)) {
		agent.SetDestination(MoveTo.position);
		CurrText = "YES \n";
		CanSee = true;
	}
	else{
		CurrText = "NO \n";
		CanSee = false;
	}
	if (FlashLight.enabled && angle > 150 && dist < 10 ){
		agent.Stop();
	}
	else{
		agent.Resume();
	}
	CurrText+=seeChance;
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
	if(dist < 2 && !GodMode && !Killed && CanSee){
		TimeUntilLevelReload = Time.time + 2;
		Killed = true;
	}
	if(agentspeed  > 1){
		PlaySoundIfNotPlaying(FootSteps);
	}
	Debug.DrawLine (agent.destination, transform.position);
}
/*
function OnTriggerStay (Player : Collider) {
	if(Player.gameObject.tag == "Player" && !GodMode && !Killed && CanSee){
		TimeUntilLevelReload = Time.time + 2;
		Killed = true;
	}
}
*/
function OnGUI () {
  GUI.Box (Rect (Screen.width-200, 25, 200, 60), CurrText);
		if(Killed){
			GUI.Box (Rect (Screen.width/2-100,Screen.height/2-30, 200, 60), "you are dead!");
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

function CanSeeChance(Chance : float){
	if(PreviousseeChance != Chance){
		PreviousseeChance = Chance;
		var RandomNumber = Random.Range(0,100);
			if (RandomNumber <= Chance){
				HaveSee = true;
				return true;
			}
			else{
				HaveSee = false;
				return false;
			}
	}
	else{
		return HaveSee;
	}
}
