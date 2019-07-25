﻿using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using ZXing;
using ZXing.QrCode;


public class ShowScanCamera : MonoBehaviour
{
    private bool camAvailable = false;
    private bool hasResult = false;
    private WebCamTexture backCam = null;
    private Texture defaultBackground = null;
    private ShowToastMsg toastMsg;
    public RawImage background;
    public AspectRatioFitter fit;

    private void Start()
    {
        toastMsg = FindObjectOfType<ShowToastMsg>();

        defaultBackground = background.texture;
        WebCamDevice[] devices = WebCamTexture.devices;

        Application.RequestUserAuthorization(UserAuthorization.WebCam);
        if (Application.HasUserAuthorization(UserAuthorization.WebCam))
        {
            //if can't find device
            if (devices.Length == 0)
            {
                Debug.Log("No camera detected");
                toastMsg.ShowMsg("無法偵測到後鏡頭!");
                camAvailable = false;
                return;
            }

            //looping to find back camera
            for (int i = 0; i < devices.Length; ++i)
            {
                if (!devices[i].isFrontFacing)
                {
                    backCam = new WebCamTexture(devices[i].name, Screen.width, Screen.height);
                }
            }

            //if no back camera detected
            if (backCam == null)
            {
                toastMsg.ShowMsg("無法偵測到後鏡頭!");
                Debug.Log("Unable to find back camera");
                return;
            }

            //found back camera, play it;
            background.texture = backCam;
            camAvailable = true;
            backCam.Play();
            toastMsg.ShowMsg("後鏡頭已開啟!");
        }
    }
    private void Update()
    {
        //if no available camera, do nothing
        if (camAvailable)
        {
            //setting camera ratio
            float ratio = (float)backCam.width / (float)backCam.height;
            fit.aspectRatio = ratio;

            //if camera is mirrored, change it to normal
            float scaleY = backCam.videoVerticallyMirrored ? -1f : 1f;
            background.rectTransform.localScale = new Vector3(1f, scaleY, 1f);

            //adjust the camera orientation
            int orient = -backCam.videoRotationAngle;
            background.rectTransform.localEulerAngles = new Vector3(0, 0, orient);

            //scanning qrcode
            try
            {
                if (!hasResult) //prevent keep create useless object after a successful scan
                {
                    IBarcodeReader barcodeReader = new BarcodeReader();
                    //choose the smaller value between width and height to fit the focus size
                    int cropSize = (backCam.width > backCam.height) ? backCam.height / 2 : backCam.width / 2;//, cropH = backCam.height / 2;
                                                                                                             //resize the camera texture to the center point, reduce the lag cause from large image decoding
                    Color[] cropImg = backCam.GetPixels((backCam.width - cropSize) / 2, (backCam.height - cropSize) / 2, cropSize, cropSize);
                    Texture2D crop2D = new Texture2D(cropSize, cropSize);
                    crop2D.SetPixels(cropImg);
                    crop2D.Apply();
                    Result result = barcodeReader.Decode(crop2D.GetPixels32(), cropSize, cropSize);
                    //if scan a qrcode successfully, close the camera to reduce the memory usage
                    if (result != null)
                    {
                        toastMsg.ShowMsg("已完成掃描!\n您將可以接收" + result.Text + "的防災警報通知");
                        hasResult = true;
                        backCam.Stop();
                    }
                    else
                    {
                        toastMsg.ShowMsg("無法辨識該QRCode!");
                    }
                }
            }
            catch (Exception ex)
            {
                toastMsg.ShowMsg(ex.Message);
            }
        }
    }

    public void CloseCam()  //reset everything if click back_btn
    {
        background.texture = null;
        backCam = null;
        camAvailable = false;
        hasResult = false;
        backCam.Stop();
    }
}
