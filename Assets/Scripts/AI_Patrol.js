#pragma strict

@script RequireComponent (NavMeshAgent)

public var MoveTo : Transform;
public var targetPoints : Transform[];
public var IdleTime = 2;
public var GodMode = false;
public var FootSteps : AudioClip;
public var SoundDead : AudioClip;

private var nextpoint = -1;
private var nextPath = 0.0;
private var TimeUntilLevelReload = Mathf.Infinity;
private var stoppingDistance = 1.5;
private var CurrText = "";
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
  agent.SetDestination(targetPoints[0].transform.position);
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
    if (FlashLight.enabled || dist < 6){
      agent.SetDestination(MoveTo.position);
      PlaySoundIfNotPlaying(FootSteps);
    }
  }
  else{
    CurrText = "I can not see you";
  }
  if (Time.time > nextPath) {
    nextpoint++;
    if (nextpoint == targetPoints.length){
      nextpoint = 0;
    }
    agent.SetDestination(targetPoints[nextpoint].transform.position);
    //print(nextpoint);
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

function OnTriggerEnter (Player : Collider) {
  if(Player.gameObject.tag == "Player" && !GodMode){
    TimeUntilLevelReload = Time.time + 2;
    Killed = true;
  }
}

function OnGUI () {
  //GUI.Box (Rect (Screen.width-200, 25, 200, 60), CurrText);
    if(Killed){
      GUI.Box (Rect (Screen.width/2-100,Screen.height/2-30, 200, 60), "you are kill");
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
