---
title: "Microsoft Is Rolling Out a Fix for Outlook Crashing After Launch" # Title of the blog post.
date: 2022-10-08T12:32:07-04:00 # Date of post creation.
author:
  - Paul Knight
description: "" # Description used for search engine.
featured: false # Sets if post is a featured post, making it appear on the sidebar. A featured post won't be listed on the sidebar if it's the current page
draft: false # Sets whether to render this page. Draft of true will not be rendered.
toc: false # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
usePageBundles: true # Set to true to group assets like images in the same folder as this post.
featureImage: "images/banner.jpg" # Sets featured image on blog post.
featureImageAlt: 'Description of image' # Alternative text for featured image.
thumbnail: "images/banner.jpg" # Sets thumbnail image appearing inside card on homepage.
shareImage: "images/banner.jpg" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: true # Override global value for showing of line numbers within code block.
figurePositionShow: true # Override global value for showing the figure label.
showRelatedInArticle: true # Override global value for showing related posts in this series at the end of the content.
categories:
  - Technology
tags:
  - microsoft
  - office 365
  - bugs
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

