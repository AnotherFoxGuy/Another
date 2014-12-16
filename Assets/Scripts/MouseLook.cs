using UnityEngine;
using System.Collections;

/*
  MouseLook rotates the transform based on the mouse delta.
  Minimum and Maximum values can be used to constrain the possible rotation

  To make an FPS style character:
  - Create a capsule.
  - Add the MouseLook script to the capsule.
    -> Set the mouse look to use LookX. (You want to only turn character but not tilt it)
  - Add FPSInputController script to the capsule
    -> A CharacterMotor and a CharacterController component will be automatically added.

  - Create a camera. Make the camera a child of the capsule. Reset it's transform.
  - Add a MouseLook script to the camera.
    -> Set the mouse look to use LookY. (You want the camera to tilt up and down like a head. The character already turns.)
*/

[AddComponentMenu("Camera-Control/Mouse Look")]
public class MouseLook : MonoBehaviour {

	public enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }
	public RotationAxes axes = RotationAxes.MouseXAndY;
	public float sensitivityX = 15F;
	public float sensitivityY = 15F;

	public float minimumX = -360F;
	public float maximumX = 360F;

	public float minimumY = -60F;
	public float maximumY = 60F;

	private GameObject  CurrObj;
	private CharacterController controller;
	private bool CanStandUp = false;
	private bool NeedStandUp = false;

	float rotationY = 0F;

	void sneak(bool sneakmode, bool forced){
		Vector3 fwd = transform.TransformDirection(Vector3.up);
		if (Physics.Raycast(transform.position, fwd, 2))
			CanStandUp = false;
		else{
			CanStandUp = true;
		}
		if (CurrObj.transform.tag == "Player"){
			if(sneakmode){
				controller.height = 0.2f;
			}
			else{
				if(CanStandUp){
					controller.height = 2.0f;
					Vector3 tmpPos = new Vector3(this.transform.localPosition.x,this.transform.localPosition.y+1, this.transform.localPosition.z);
					transform.localPosition = tmpPos;
				}
				else{
					NeedStandUp = true;
				}
			}
			if(forced){
				controller.height = 2.0f;
				Vector3 tmpPos = new Vector3(this.transform.localPosition.x,this.transform.localPosition.y+1, this.transform.localPosition.z);
				transform.localPosition = tmpPos;
				NeedStandUp =false;
			}
		}
		if (CurrObj.transform.tag == "MainCamera"){
			if(sneakmode){
				Vector3 tmpPos = new Vector3(this.transform.localPosition.x,0.2f, this.transform.localPosition.z);
				transform.localPosition = tmpPos;
			}
			else{
				if(CanStandUp){
					Vector3 tmpPos = new Vector3(this.transform.localPosition.x,0.6f, this.transform.localPosition.z);
					transform.localPosition = tmpPos;

				}
				else{
					NeedStandUp = true;
				}
			}
			if(forced){
				Vector3 tmpPos = new Vector3(this.transform.localPosition.x,0.6f, this.transform.localPosition.z);
				transform.localPosition = tmpPos;
				NeedStandUp =false;
			}
		}
	}
	void Update ()
	{
		Vector3 fwd = transform.TransformDirection(Vector3.up);
		if (!Physics.Raycast(transform.position, fwd, 3) && NeedStandUp)
			sneak(false,true);
		if (axes == RotationAxes.MouseXAndY)
		{
			float rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;

			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);

			transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
		}
		else if (axes == RotationAxes.MouseX)
		{
			transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
		}
		else
		{
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);

			transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
		}
		if(Input.GetButtonDown("Sneak")){
			sneak(true,false);
		}
		if(Input.GetButtonUp("Sneak") && CanStandUp){
			sneak(false,false);
		}
	}


	void Start ()
	{
		CurrObj = GameObject.Find(this.name);
		if (CurrObj.transform.tag == "Player")
			controller = GetComponent<CharacterController>();
		if (GetComponent<Rigidbody>())
			GetComponent<Rigidbody>().freezeRotation = true;
		sneak(false,true);

	}
}
