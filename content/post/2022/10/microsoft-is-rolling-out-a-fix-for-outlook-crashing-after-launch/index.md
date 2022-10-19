---
draft: false
showRelatedInArticle: true
featureImageAlt: Description of image
news_post: true
author:
  - paul-knight
title: Microsoft Is Rolling Out a Fix for Outlook Crashing After Launch
date: 2022-10-08T12:32:07-04:00
description: ""
featured: false
toc: false
usePageBundles: true
featureImage: images/banner.jpg
thumbnail: images/banner.jpg
shareImage: images/banner.jpg
codeLineNumbers: true
codeMaxLines: 10
figurePositionShow: true
tags:
  - Microsoft
  - Office 365
categories: Systems & Technology
---

Microsoft has finally been able to push out a fix for a known issue with Outlook causing the application to freeze and crash for Microsoft 365 users immediately after opening. 

"When you start Outlook Desktop, it gets past loading profile and processing, briefly opens, and then stops responding," Microsoft said in a support post. 

"The issue occurs when the EmailAddress string data value under Office identity is blank."

According to a support document released August 11th, the Outlook Desktop client crashes are logged in Windows Event Viewer as Event 1000 or Event 1001. On affected systems,  these event entries list 0x01483052 exception codes with 0x1328 faulting process IDs and 0x000000000024074d fault offsets.

In an update released this week to address the issue, the company revealed that a fix is now being distributed in the Current and Semi-Annual Enterprise channels, with other channels being added to the queue in the near future.

"This issue is fixed in Current Channel Version 2209 (Build 15629.20156) and Semi-Annual Enterprise Channel (Preview) Version 2208 (Build 15601.20158). As these builds get to the other channels the fixes will follow," Microsoft [says](https://support.microsoft.com/en-us/topic/outlook-closes-shortly-after-it-is-opened-2d32d880-70a0-4ee0-b1e9-9e920721abdd).

## Workaround for Non-Current/Enterprise Customers
Microsoft has provided a workaround for those afected by the bug but stuck in limbo waiting for the fix to queue up:

- Sign out of Office and then sign back into Office to repopulate the identity registry settings. For more information, use Sign in to Office.

- If the identity is still not getting set properly, you can turn off Support Diagnostics which turns off the option to submit an In App ticket using Help, Contact Support, and its feature path that triggers Outlook to stop responding by setting the following registry key (more info available here):

- [HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\Options\General] 
  - "DisableSupportDiagnostics"=dword:00000001

- You can try manually setting the email address to the identity of the user that is seeing the issue in the registry path referenced in the issue specifics above.

Microsoft recently addressed another bug affecting the Outlook email client which caused similar crashes to occur. This bug was attibuted to emails containing tables, for example those seen in digital receipts. In the same month, another update was pulled back after from Office 365 users reported application crashing when hovering over a user's name or photo or viewer a contact card. 

