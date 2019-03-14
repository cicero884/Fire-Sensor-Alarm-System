using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using ZXing;
using ZXing.QrCode;

public class Btn_Confirm : MonoBehaviour
{
    public InputField inputText;
    public Image img;
    private Texture2D encoded;
    // Start is called before the first frame update
    public void ButtonClick()
    {
        if (inputText.text == "")
            return;
        encoded = new Texture2D(600, 600);
        encoded.SetPixels32(Encoding(inputText.text, encoded.width, encoded.height));
        encoded.Apply();
        img.color = new Color(255f, 255f, 255f, 1f);
        img.sprite = Sprite.Create(encoded, new Rect(0, 0, encoded.width, encoded.height), Vector2.zero);
    }

    private Color32[] Encoding(string encodeText, int width, int height)
    {
        BarcodeWriter writer = new BarcodeWriter
        {
            Format = BarcodeFormat.QR_CODE,
            Options = new QrCodeEncodingOptions//設定QR Code圖片寬度和高度
            {
                Height = height,
                Width = width
            }
        };
        return writer.Write(encodeText);
    }
}
