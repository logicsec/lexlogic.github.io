---
title: 'Cybercriminals Are Selling Access to Chinese Surveillance Cameras'
description: 'Tens of thousands of cameras have failed to patch a critical, 11-month-old CVE, leaving thousands of organizations exposed.'
summary: 'Tens of thousands of cameras have failed to patch a critical, 11-month-old CVE, leaving thousands of organizations exposed.'
date: '2022-10-04T14:43:57-04:00'
aliases:
  - chineese-cameras
usePageBundles: true
toc: true
featured: true

featureImage: 'images/banner.jpg' # Top image on post.
thumbnail: 'images/banner.jpg' # Image in lists of posts.
shareImage: 'images/banner.jpg' # For SEO and social media snippets.

categories:
  - security
tags:
  - news
  - cameras
---

New [research](https://www.cyfirma.com/wp-content/uploads/2022/08/HikvisionSurveillanceCamerasVulnerabilities.pdf) indicates that over 80,000 Hikvision surveillance cameras in the world today are vulnerable to an 11 month-old command injection flaw.

{{< br >}}

Hikvision – short for Hangzhou Hikvision Digital Technology – is a Chinese state-owned manufacturer of video surveillance equipment. Their customers span over 100 countries (including the United States, despite the FCC labeling Hikvision “an unacceptable risk to U.S. national security” in 2019).

{{< br >}}

Last Fall, a command injection flaw in Hikvision cameras was revealed to the world as [CVE-2021-36260](https://nvd.nist.gov/vuln/detail/CVE-2021-36260). The exploit was given a “critical” 9.8 out of 10 rating by NIST.

{{< br >}}

Despite the severity of the vulnerability, and nearly a year into this story, over 80,000 affected devices remain unpatched. In the time since, the researchers have discovered “multiple instances of hackers looking to collaborate on exploiting Hikvision cameras using the command injection vulnerability,” specifically in Russian dark web forums, where leaked credentials have been put up for sale.

{{< br >}}

The extent of the damage done already is unclear. The authors of the report could only speculate that “Chinese threat groups such as MISSION2025/APT41, APT10 and its affiliates, as well as unknown Russian threat actor groups could potentially exploit vulnerabilities in these devices to fulfill their motives (which may include specific geo-political considerations).”

{{< br 3 >}}

## The Risk in IoT Devices
With stories like this, it’s easy to ascribe laziness to individuals and organizations that leave their software unpatched. But the story isn’t always so simple.

{{< br >}}

According to David Maynor, senior director of threat intelligence at Cybrary, Hikvision cameras have been vulnerable for many reasons, and for a while. “Their product contains easy to exploit systemic vulnerabilities or worse, uses default credentials. There is no good way to perform forensics or verify that an attacker has been excised. Furthermore, we have not observed any change in Hikvision’s posture to signal an increase in security within their development cycle.”

{{< br >}}

A lot of the problem is endemic to the industry, not just Hikvision. “IoT devices like cameras aren’t always as easy or straightforward to secure as an app on your phone,” Paul Bischoff, privacy advocate with Comparitech, wrote in a statement via email. “Updates are not automatic; users need to manually download and install them, and many users might never get the message. Furthermore, IoT devices might not give users any indication that they’re unsecured or out of date. Whereas your phone will alert you when an update is available and likely install it automatically the next time you reboot, IoT devices do not offer such conveniences.”

{{< br >}}

While users are none the wiser, cybercriminals can scan for their vulnerable devices with search engines like Shodan or Censys. The problem can certainly be compounded with laziness, as Bischoff noted, “by the fact that Hikvision cameras come with one of a few predetermined passwords out of the box, and many users don’t change these default passwords.”

{{< br >}}

Between weak security, insufficient visibility and oversight, it’s unclear when or if these tens of thousands of cameras will ever be secured.
