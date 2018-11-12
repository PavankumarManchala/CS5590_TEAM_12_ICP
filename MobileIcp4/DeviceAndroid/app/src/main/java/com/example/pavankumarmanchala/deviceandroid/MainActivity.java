package com.example.pavankumarmanchala.deviceandroid;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

import com.example.pavankmanchala.deviceandroid.R;

public class MainActivity extends AppCompatActivity {

    Button button_map, button_photo, button_record, button_storage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
    }

    public void onPhotoClick(View v) {

        Intent redirect = new Intent(MainActivity.this, CameraActivity.class);
        startActivity(redirect);
    }

    public void onLocationClick(View v) {

        Intent redirect = new Intent(MainActivity.this, LocationActivity.class);
        startActivity(redirect);
    }
    public void onSensorClick(View v){
        Intent redirect = new Intent(MainActivity.this, Accelerometer.class);
        startActivity(redirect);
    }
}