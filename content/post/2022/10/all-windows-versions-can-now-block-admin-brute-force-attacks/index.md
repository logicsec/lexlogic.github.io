---
draft: false
title: All Windows versions can now block admin brute-force attacks
date: 2022-10-12T00:48:28.268Z
usePageBundles: true
featureImage: images/windows.webp
featureImageCap: ""
thumbnail: images/windows.webp
shareImage: images/windows.webp
codeLineNumbers: true
codeMaxLines: 10
figurePositionShow: true
showRelatedInArticle: true
categories:
  - Microsoft
tags:
  - Microsoft
  - Bruteforce
  - Policy
---
Microsoft said today that IT administrators may set up group policies to automatically prevent brute force attacks against local administrator accounts on any Windows system that is currently receiving security updates. 

This comes after David Weston, Microsoft's VP for Enterprise and OS Security, stated in July that the most recent Windows 11 builds now had the same Windows group policy activated by default.

As a result, on Windows 11 systems where the policy is enabled, user accounts—including Administrator accounts—are automatically locked for 10 minutes after 10 unsuccessful sign-in attempts in a 10-minute period. 

"Win11 builds now have a DEFAULT account lockout policy to mitigate RDP and other brute force password vectors," he [tweeted](https://twitter.com/dwizzzleMSFT/status/1549870156771340288) on July 21st.

"This technique is very commonly used in Human Operated Ransomware and other attacks - this control will make brute forcing much harder which is awesome!"

Nearly three months after Weston's announcement, Microsoft declared today that any Windows PC with the October 2022 cumulative updates installed now supports the same account lockout policy. 

"In an effort to prevent further brute force attacks/attempts, we are implementing account lockouts for Administrator accounts," [Microsoft said today](https://support.microsoft.com/en-us/topic/kb5020282-account-lockout-available-for-local-administrators-bce45c4d-f28d-43ad-b6fe-70156cb2dc00).

"Beginning with the October 11, 2022, or later Windows cumulative updates, a local policy will be available to enable local administrator account lockouts."

Admins who want to enable this additional defense against brute force attacks can find the "Allow Administrator account lockout" policy under *Local Computer Policy\Computer Configuration\Windows Settings\Security Settings\Account Policies\Account Lockout Policies*.

This group policy will be enabled by default on all new machines running Windows 11 22H2 or those where the October 2022 Windows cumulative updates were installed before the initial setup when the Security Account Manager (SAM) database stores the users' passwords is first instantiated on the new machine.

Microsoft also announced today that it will now require local administrator accounts to use complex passwords that "must have at least three of the four basic character types (lower case, upper case, numbers, and symbols)."

This decision was taken as an extra defense against brute force attacks which are easy to pull off using systems with modern CPUs and GPUs if the passwords are not long or complex enough. 

Microsoft has been working hard to reduce the attack surface available to threat actors and ransomeware operators over the last couple of years, as shown by its recent decisions to also auto-block Office macros in downloaded documents and enforce multi-factor authentication (MFA) in Azure AD.

We can expect more changes to come in the future as Microsoft continues to improve security on its modern operating systems.