#pragma strict


public var MoveTo : Transform;

function Start () {
  transform.renderer.material.color = Color.red;
}

function Update () {
  transform.LookAt(MoveTo);
  var RandomPosition = Vector3(Random.Range(MoveTo.position.x - 20.0, MoveTo.position.x + 20.0), MoveTo.position.y, Random.Range(MoveTo.position.x - 20.0, MoveTo.position.x + 20.0));
  var hit : RaycastHit;
  var tmpPos = Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z);
  var dist = Vector3.Distance(MoveTo.position, transform.position);
  var targetDir = Camera.main.transform.position - transform.position;
  var forward = Camera.main.transform.forward;
  var angle = Vector3.Angle(targetDir, forward);
  if (angle <= 100 && dist > 5 && Physics.Raycast (tmpPos,transform.TransformDirection(Vector3.forward), hit, dist)){
    if (hit.collider != null){
      renderer.enabled = false;
      transform.position = RandomPosition;
    }
  }
  else{
    Debug.DrawLine (tmpPos, MoveTo.position);
    renderer.enabled = true;
  }
}
