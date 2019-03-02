using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class ShowCamera : MonoBehaviour
{
    private bool camAvailable;
    private WebCamTexture backCam;
    private Texture defaultBackground;
    
    public RawImage background;
    public AspectRatioFitter fit;

    private void Start()
    {
        defaultBackground = background.texture;
        WebCamDevice[] devices = WebCamTexture.devices;
        
        //if can't find device
        if(devices.Length == 0)
        {
            Debug.Log("No camera detected");
            camAvailable = false;
            return;
        }

        //looping to find back camera
        for(int i = 0; i < devices.Length; ++i)
        {
            if (!devices[i].isFrontFacing)
            {
                backCam = new WebCamTexture(devices[i].name, Screen.width, Screen.height);
            }
        }

        //if no back camera detected
        if(backCam == null)
        {
            Debug.Log("Unable to find back camera");
            return;
        }

        //found back camera, play it;
        backCam.Play();
        background.texture = backCam;
        camAvailable = true;
    }
    private void Update()
    {
        //if no available camera, do nothing
        if (!camAvailable)
            return;

        //setting camera ratio
        float ratio = (float)backCam.width / (float)backCam.height;
        fit.aspectRatio = ratio;

        //if camera is mirrored, change it to normal
        float scaleY = backCam.videoVerticallyMirrored ? -1f : 1f;  
        background.rectTransform.localScale = new Vector3(1f, scaleY, 1f);

        //adjust the camera orientation
        int orient = -backCam.videoRotationAngle;
        background.rectTransform.localEulerAngles = new Vector3(0, 0, orient);
    }
}
