---
draft: false
news_post: true
author:
  - paul-knight
title: "Dropbox Breach: Hackers Accessed Over 100 Source Code Repositories"
date: 2022-11-02T13:30:45.252Z
featured: true
usePageBundles: true
featureImage: images/e-sign-and-dropbox.jpg
thumbnail: images/e-sign-and-dropbox.jpg
shareImage: images/e-sign-and-dropbox.jpg
codeLineNumbers: true
codeMaxLines: 10
figurePositionShow: true
showRelatedInArticle: true
tags:
  - Email Security
  - Phishing
categories: Social Engineering
---
Dropbox, a digital content management company, revealed on Tuesday that it had fallen victim to a phishing attack that had given unknown threat actors access to 130 of its GitHub source code projects without authorization.

"These repositories included our own copies of third-party libraries slightly modified for use by Dropbox, internal prototypes, and some tools and configuration files used by the security team," the company [revealed](https://dropbox.tech/security/a-recent-phishing-campaign-targeting-dropbox) in an advisory.

Some of the API keys used by Dropbox developers were made available as a result of the attack, along with "a few thousand names and email addresses belonging to Dropbox employees, current and past customers, sales leads, and vendors."

It emphasized, however, that the repositories did not include any source code for its primary applications or infrastructure.

As of [August 2022](https://dropbox.gcs-web.com/news-releases/news-release-details/dropbox-announces-second-quarter-fiscal-2022-results), Dropbox had over 700 million registered users and over 17.37 million paying customers. It provides cloud storage, data backup, and document signing services, among other things.

The information was revealed more than a month after GitHub and CircleCI both issued warnings about phishing attempts to acquire GitHub credentials via phony notifications posing as coming from the CI/CD platform.

The San Francisco-based firm noted that "multiple Dropboxers received phishing emails impersonating CircleCI" in early October, some of which slipped through its automated spam filters to land in employees' email inboxes.

"These legitimate-looking emails directed employees to visit a fake CircleCI login page, enter their GitHub username and password, and then use their hardware authentication key to pass a One Time Password (OTP) to the malicious site," Dropbox explained.

The company did not say how many of its workers were duped by the phishing scam, but it did say that it rotated all exposed developer credentials right away and informed law police.

It added that it is upgrading its two-factor authentication systems to support two-factor authentication and that it has not uncovered any evidence that any customer data was stolen as a result of the incident. They will also start adding hardware security keys, sometimes referred to as FIDO tokens, for phishing resistance.

"Vigilant professionals can fall prey to a carefully crafted message delivered in the right way at the right time," the company concluded. "This is precisely why phishing remains so effective."