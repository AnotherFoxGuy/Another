#pragma strict

@script RequireComponent (NavMeshAgent)

public var MoveTo : Transform;
public var targetPoints : Transform[];
public var IdleTime = 2;
public var GodMode = false;
public var FootSteps : AudioClip;
public var SoundDead : AudioClip;

private var nextpoint = 0;
private var nextPath = 0.0;
private var TimeUntilLevelReload = Mathf.Infinity;
private var stoppingDistance = 1.5;
private var CurrText = "";
private var Used = true;
private var Called = true;
private var Killed = false;
private var agent: NavMeshAgent;
private var SoundHashtable = new Hashtable();
private var Player : GameObject;
private var FlashLight : Light;



function Start () {
  agent = GetComponent.<NavMeshAgent>();
  Player = GameObject.Find("Main Camera");
  FlashLight = Player.GetComponent(Light);
  agent.stoppingDistance = stoppingDistance;
  agent.SetDestination(targetPoints[0].transform.position);
}

function Update () {
  var hit: NavMeshHit;
  var targetDir = Camera.main.transform.position - transform.position;
  var forward = Camera.main.transform.forward;
  var angle = Vector3.Angle(targetDir, forward);
  var dist = Vector3.Distance(MoveTo.position, transform.position);
    if (!agent.Raycast(MoveTo.position, hit)) {
      agent.SetDestination(MoveTo.position);
      CurrText = "I can see you";
      PlaySoundIfNotPlaying(FootSteps);
    }
    else{
      CurrText = "I can not see you";
    }
    if (Time.time > nextPath) {
      nextpoint++;
      if (nextpoint == targetPoints.length){
        nextpoint = 0;
      }
      else{
        agent.SetDestination(targetPoints[nextpoint].transform.position);
        print(nextpoint);
      }
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
    if (FlashLight.enabled && angle > 150 && dist < 10){
      agent.Stop();
    }
  Debug.DrawLine (agent.destination, transform.position);
}

function OnTriggerEnter (player : Collider) {
  if(player.gameObject.tag == "Player" && !GodMode){
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
