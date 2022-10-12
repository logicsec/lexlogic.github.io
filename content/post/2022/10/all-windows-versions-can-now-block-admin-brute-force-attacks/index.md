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
Microsoft announced today that IT admins can now configure any Windows system still receiving security updates to automatically block brute force attacks targeting local administrator accounts via a group policy.

This comes after David Weston, Microsoft's VP for Enterprise and OS Security, said in July that the same Windows group policy is now enabled by default on the latest Windows 11 builds.

As a result, Windows 11 systems where the policy is toggled on automatically lock user accounts (including Administrator accounts) for 10 minutes after 10 failed sign-in attempts within 10 minutes.

"Win11 builds now have a DEFAULT account lockout policy to mitigate RDP and other brute force password vectors," he [tweeted](https://twitter.com/dwizzzleMSFT/status/1549870156771340288) on July 21st.

"This technique is very commonly used in Human Operated Ransomware and other attacks - this control will make brute forcing much harder which is awesome!"

Today, almost three months after Weston's announcement, Microsoft revealed that the same account lockout policy is now available on any Windows system where the October 2022 cumulative updates are installed.

"In an effort to prevent further brute force attacks/attempts, we are implementing account lockouts for Administrator accounts," [Microsoft said today](https://support.microsoft.com/en-us/topic/kb5020282-account-lockout-available-for-local-administrators-bce45c4d-f28d-43ad-b6fe-70156cb2dc00).

"Beginning with the October 11, 2022 or later Windows cumulative updates, a local policy will be available to enable local administrator account lockouts."

![Windows 11 Account Lockout Policy](https://www.bleepstatic.com/images/news/u/1109292/2022/Windows%2011%20Account%20Lockout%20Policy.png)

*Windows 11 Account Lockout Policy*

Admins who want to toggle on this additional defense against brute force attacks can find the "Allow Administrator account lockout" policy under *Local Computer Policy\Computer Configuration\Windows Settings\Security Settings\Account Policies\Account Lockout Policies*.

This group policy will be enabled by default on all new machines running Windows 11 22H2 or those where the October 2022 Windows cumulative updates were installed before the initial setup when the Security Account Manager (SAM) database that stores the users' passwords is first instantiated on the new machine.

Microsoft also announced today that it now requires local administrator accounts to use complex passwords that "must have at least three of the four basic character types (lower case, upper case, numbers, and symbols)."

This decision was taken as an extra defense against brute force attacks which are trivial to pull off using systems with modern CPUs and GPUs if the passwords are not long or complex enough.

Redmond is slowly shrinking the attack surface abused by ransomware operators to breach Windows systems, as shown by its recent decisions to also auto-block Office macros in downloaded documents and enforce multi-factor authentication (MFA) in Azure AD.