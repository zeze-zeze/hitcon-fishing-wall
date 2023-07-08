# HITCON Fishing Wall

## Introduction
The HITCON Fishing Wall is an interactive activity organized during HITCON to raise awareness about the risks of connecting to anonymous Wi-Fi networks. In this project, we create a simulated malicious Wi-Fi access point. When attendees connect to this malicious network, their network traffic is redirected to a phishing site designed to capture their credentials. Once the credentials are obtained, the project securely sends the user data to a dashboard and displays an introduction page explaining the purpose of the project. Additionally, participants can modify the content of the description displayed on the dashboard and submit hidden flags embedded within the project.

## Features
* phishing sites
    * facebook
    * gmail
    * kktix
    * twitter
    * github
    * linkedin
    * instagram
    * hackmd
* send tolen credentials
    * username
    * token
    * description
    * flag count
* submit flags
* dashboard

## Setup
1. Modify the configuration to suit your specific requirements.
2. Follow the [setup](./setup) instructions to establish the desired environment.
3. Once you connect to the Wi-Fi network or join the LAN, open your web browser, and you will be automatically redirected to a phishing site.