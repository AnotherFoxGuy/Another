#pragma strict

public var prefab : GameObject;

function Start () {
  SpawnKey();
  SpawnKey();
  SpawnKey();
  SpawnKey();
  SpawnKey();
}

function SpawnKey(){
  var position = Vector3(Random.Range(-20.0, 20.0), Random.Range(2.0, 10.0), Random.Range(-20.0, 20.0));
  Instantiate(prefab, position, Quaternion.identity);
}
