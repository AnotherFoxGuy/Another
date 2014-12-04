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
private var SeeTimer = 0f;
private var HaveSee = false ;
private var GodModeProgress = 0;
private var CheatDelay = 0f;


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
	UpdateCheats();
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
	var SeeChance = 0;
	var SCvar = dist/25;
	SeeChance+= Mathf.Abs(Playercontroller.velocity.x + Playercontroller.velocity.z)/SCvar;
	if (!Physics.Raycast (transform.position, direction, hit, dist)){
		if(Playercontroller.height < 1)
			SeeChance+=10;
		else
			SeeChance+=90;
		if(FlashLight.enabled)
			SeeChance+=20;
	}
	if(dist > 10){
		SeeChance = 0;
	}
	if (CanSeeChance(SeeChance)) {
		agent.SetDestination(MoveTo.position);
		CurrText = "YES";
		CanSee = true;
		agent.speed = 9;
	}
	else{
		CurrText = "NO";
		CanSee = false;
		agent.speed = 3;
	}
	if (FlashLight.enabled && angle > 150 && dist < 10 ){
		agent.Stop();
	}
	else{
		agent.Resume();
	}
	CurrText+= "\n";
	CurrText+=SeeChance;
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
	if(Time.time > SeeTimer ){
		SeeTimer = Time.time+1;
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
function UpdateCheats() {
	if(CheatDelay > 0.0){
		CheatDelay -= Time.deltaTime;
		if(CheatDelay <= 0.0){
			CheatDelay = 0.0;
			GodModeProgress = 0;
		}
	}
	if(GodModeProgress == 0 && Input.GetKeyDown('g')){
		++GodModeProgress; CheatDelay = 1.0;
	} else if(GodModeProgress == 1 && Input.GetKeyDown('o')){
		++GodModeProgress; CheatDelay = 1.0;
	} else if(GodModeProgress == 2 && Input.GetKeyDown('d')){
		GodModeProgress = 0;
		PlaySoundIfNotPlaying(SoundDead);
		GodMode = !GodMode;
	}
}
