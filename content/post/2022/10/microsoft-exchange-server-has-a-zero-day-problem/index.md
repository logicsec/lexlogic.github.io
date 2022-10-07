---
title: "Microsoft Exchange Server Has a Zero-Day Problem" # Title of the blog post.
date: 2022-10-07T14:19:16-04:00 # Date of post creation.
description: "" # Description used for search engine.
featured: true # Sets if post is a featured post, making it appear on the sidebar. A featured post won't be listed on the sidebar if it's the current page
draft: false # Sets whether to render this page. Draft of true will not be rendered.
toc: true # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
usePageBundles: true # Set to true to group assets like images in the same folder as this post.
featureImage: "images/thumbnail.png" # Sets featured image on blog post.
featureImageAlt: 'Description of image' # Alternative text for featured image.
featureImageCap: 'Illustration: Sylverarts/Getty Images' # Caption (optional).
thumbnail: "images/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
shareImage: "images/thumbnail.png" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: true # Override global value for showing of line numbers within code block.
figurePositionShow: true # Override global value for showing the figure label.
showRelatedInArticle: false # Override global value for showing related posts in this series at the end of the content.
categories:
  - Security
tags:
  - Zero-Day
  - Microsoft
  - Exchange
---

On Thursday night, Microsoft confirmed that two unpatched Exchange Server vulnerabilities are actively being exmploited by cybercriminals across the globe. The vulnerabilities were first discovered by GTSC, a Vietnamese cyber security company, claiming that the vulnerabilites have been in use since August. Both flaws target on-premise Exchange Servers and requires the attacker to be authenticated. Both vulnerabilities can be chained together to create a backdoor back into the server. "The vulnerability turns out to be so critical that it allows the attacker to do RCE [remote code execution] on the compromised system," [the researchers said](https://gteltsc.vn/blog/warning-new-attack-campaign-utilized-a-new-0day-rce-vulnerability-on-microsoft-exchange-server-12715.html). 

[In a blog post](https://msrc-blog.microsoft.com/2022/09/29/customer-guidance-for-reported-zero-day-vulnerabilities-in-microsoft-exchange-server/), Microsoft described the first flaw as a server-side request forgery (SSRF) vulnerability, and the second as “an attack that allows remote code execution on a vulnerable server when PowerShell is accessible to the attacker.” The post also provides guidance for how on-premises Microsoft Exchange customers should mitigate the attack.

## Mitigations

Fortunately, Microsoft has released several mitigations against this attack until a patch can be released. These mitigations rewrite the URL to make it more difficult for threat actors to determine if a given server is vulnerable to attack. 

The current Exchange Server mitigation is to add a blocking rule in “IIS Manager -> Default Web Site -> URL Rewrite -> Actions” to block the known attack patterns. Exchange Server customers should review and use one of these options.

Option 1: For customers who have the Exchange Emergency Mitigation Service (EEMS) enabled, Microsoft released the URL Rewrite mitigation for Exchange Server 2016 and Exchange Server 2019. The mitigation is enabled automatically and is updated to include the URL Rewrite rule improvements. Please see [this blog post](https://techcommunity.microsoft.com/t5/exchange-team-blog/new-security-feature-in-september-2021-cumulative-update-for/ba-p/2783155) for more information on this service and how to check active mitigations.

Option 2: Microsoft created the EOMTv2 script for the URL Rewrite mitigation steps and updated it to include the URL Rewrite rule improvements. EOMTv2 script will auto-update on Internet connected machines and the updated version will show as 22.10.06.0840. The script should be re-run on any Exchange Server without EEMS enabled. [https://aka.ms/EOMTv2](https://aka.ms/EOMTv2 )
