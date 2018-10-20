package com.pavankumarmanchala.icp1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void checkCredentials(View v) {
        EditText usernameCtrl = (EditText) findViewById(R.id.username);
        EditText passwordCtrl = (EditText) findViewById(R.id.password);
        TextView errorText = (TextView) findViewById(R.id.Lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

   //     boolean validationFlag = false;
            if (userName.equals("admin") && password.equals("admin")) {
                Intent redirect = new Intent(MainActivity.this, HomeActivity.class);
                startActivity(redirect);
            }
            else {
            errorText.setText("Invalid Entry");
        }
    }
}