using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class KeyScript : MonoBehaviour {

	public List<GameObject> GameObjects;
	public List<Transform> GameObjectsPosition;

	void Start()
	{
		foreach(GameObject k in GameObjects)
		{
			int randomnr = Random.Range(0, GameObjectsPosition.Count);
			Instantiate(k, GameObjectsPosition[randomnr].position, GameObjectsPosition[randomnr].rotation);
			GameObjectsPosition.RemoveAt(randomnr);
		}
	}
}
