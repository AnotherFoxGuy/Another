//UnnamedGameProject

public var MoveTo : Transform;
/*
public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var runAnimation : AnimationClip;
public var jumpPoseAnimation : AnimationClip;
*/

public var stoppingDistance : float;

private var CurrText = "";
private var Used = true;
private var agent: NavMeshAgent;


function Start () {
	agent = GetComponent.<NavMeshAgent>();
	agent.stoppingDistance = stoppingDistance;
}

function Update () {

	agent.SetDestination(MoveTo.position);


	if(agent.remainingDistance >= 999999999999999999){
			CurrText = "I cant see you";
			//agent.Stop();
			//animation.Play(idleAnimation.name);
	}
	else{
			CurrText = "I can see you";
		}
	CurrText = CurrText+ " @ "+agent.remainingDistance;
	if (agent.remainingDistance >= stoppingDistance){
		//animation.Play(walkAnimation.name);

	}
	else{
		//animation.Play(idleAnimation.name);
	}

}


function OnGUI () {
    GUI.Label (Rect (25, 25, 100, 30), CurrText);
}

function OnTriggerEnter () {
	//Used = false;
	//agent.Stop();
}

function OnTriggerExit () {
	//Used = true;
}
