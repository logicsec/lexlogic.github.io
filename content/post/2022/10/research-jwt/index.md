---
draft: false
featureImage: images/banner.png
summary: ""
author:
  - paul-knight
title: Exploring the JWT Attacks Landscape
date: 2022-10-03
description: ""
featured: true
toc: true
usePageBundles: true
thumbnail: images/banner.png
shareImage: images/banner.png
codeMaxLines: 10
tags:
  - Vulnerabilities
  - Application Security
  - Identity & Access Management
categories:
  - Education & Training
aliases:
  - chineese-cameras
---

## What is JWT ?

JWT, or JSON Web Token, is an open standard (RFC 7519) used to exchange security information between a client and a server. Due to its popularity, JWT attacks are one of of the most exploited vulnerability by attackers. Each JWT contains base64 encoded JSON objects. A cryptographic algorithm is used to sign JWT tokens to ensure the token's integrity and protect against JWT attacks.

<br/><br/>

## JWT structure

JSON web tokens consist of three parts separated by dots (.) which are:
<br/><br/>
- Header
- Payload
- Signature
<br/><br/>
Header consists of two parts; the type of token and the signature being used.

```json
{ 
“alg”:”HS256”, 
“type”:”JWT” 
} 
```

The payload contains information about the user and additional entity attributes, called claims. A sample payload would look like:
<br/><br/>
`{ "uid": "1337", "name": "John Doe", "isAdmin": true }`
<br/><br/>
The signature part is created by taking the encoded header, the encoded payload, a secret, and signing them with the algorithm mentioned in the header.

If HMAC SHA256 algorithm is to be used, the signature will be created in the following way:<br/><br/>

```sh 
HMACSHA256(base64UrlEncoded(header)+”.”+base64UrlEncoded(payload), secret)
```

Finally, the JWT token is compiled by joining base64URL encoded header, payload, and the signature with dots. A typical JWT will look like:

```sh
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMzM3IiwibmFtZSI6IkpvaG4gRG9lIiwiaXNBZG1pbiI6InRydWUifQ.sUV1I_A8AuB-D1EVy3_LSlfG2kCysERFKLUX7pej5Eo
```

<br/><br/>

## JWT attacks in the wild

- Change to 'NONE'
<br/><br/>
JWT supports "none" value in alg field for debugging purpose. If this field is set to "none", any token will be considered valid, provided signature is empty. This allows attackers to forge the token and set field values according to their requirement.
<br/><br/>
- JWT token expiration
<br/><br/>
The “exp” payload in JWT is used to check the expiry. If a token doesn’t expire, it is possible that an attacker can masquerade as the victim if they are somehow able to steal the token.
<br/><br/>
For this, capture a JWT token and try to use it after the token has expired. If the application still accepts it, this is a security issue.
<br/><br/>
- HMAC algorithm
<br/><br/>
HMAC and RSA are two most common algorithms used in JWT . HMAC works on the principle of symmetric encryption while RSA used assymetric encryption. To preserve integrity, the secrecy of secret key in HMAC and private key in RSA must be maintained.
<br/><br/>
Now, suppose a token was signed with RSA private key and verfied using RSA public key. An attacker might change the alg to HMAC and use the public RSA key to sign the forged token. If the application still verifies it using the public RSA key, we have successfully tampered the token.
<br/><br/>
- Brute-forcing JWT token
<br/><br/>
It is also possible to brute force the JWT token if a weak secret key is used. Upon successful brute force, we can use the obtained secret to sign the token again using jwt.io with forged input. JWT-cracker can be used to crack the token.
<br/><br/>

`Usage: jwt-cracker`
<br/><br/>

- Improper signature verification
<br/><br/>
Sometimes the developer can ignore signature verification i.e the signature is never verified at the backend. This way, an attacker can provide any random token with forged values to bypass the authentication mechanism.
<br/><br/>
- Automate it all
<br/><br/>
JWT-tool is a great starter to check for all issues at once just by running few commands. Just run

```sh
python3 jwt_tool.py -M at -t "https://vitcim.com/api/v1/user/id" -rh "Authorization: Bearer eyJhbG...<JWT Token>"
```

and wait for the results.
<br/><br/>
- Directory traversal
<br/><br/>
The KID is an optional header in JWT, which allows the developers to specify which key is to be used for verification of the token. This is how the KID parameter looks like in a JWT :

```json
{  
 "alg" : "HS256",  
 "typ" : "JWT",  
 "kid" : "123"        
}
```

The KID provides the location of key file on the file system, improper sanitization before use can lead to directory traversal attacks. When this is the case, the attacker would be able to specify any file in the file system as the key to be used to verify the token. In worst case, the attacker will able to use any key in the file file system for the verification of token.
<br/><br/>
- SQL Injection
<br/><br/>
Since the KID field can be provided by the user, it paves the way for a number of injection attacks. It can lead to SQL injection if the KID is being fetched from the database. Attacker can use the following payload :
<br/><br/>
`“kid”: "invalid-key' UNION SELECT 'attackers-key';--".`
<br/><br/>
Since the database does not contain invalid-key, the token will now be verified using the `attackers-key`.
<br/><br/>
These are some of the common attacks in JWT authentication. Payatu maintains a series of blogs on different topics related to information security. Visit Payatu blogs to read more.
<br/><br/>
- JKU header tampering
<br/><br/>
In the JWT header, jku parameter can also be used by developers to specify the JSON Web Key Set URL. This parameter points to an endpoint, where the JSON Web Key (JWK) used to verify the signature is located. Let us understand this by using an example:

```sh
{ 

  "alg": "RS256", 

  "typ": "JWT", 

  "jku":"https://key-server.com/key.json" 

}. 

{ 

  "user_name": "john.doe", 

  "is_admin": false 

} 
```
<br/><br/>
An attacker can replace the jku parameter value with their own JWK instead of the valid one. If there are no proper checks, this gives an attacker permission to sign malicious tokens using their own private key. Once the malicious token is sent, the application will verify it using the attacker’s JWK.