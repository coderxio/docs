---
slug: the-hidden-dependency-in-drug-pricing
title: The hidden dependency in drug pricing transparency
authors: [joeylegrand]
tags: [drug-data, pricing, nadac, healthcare, packaging]
---

Why transparent drug pricing relies on proprietary pack size data

Last week, a pharmacy manager called me with what seemed like a simple question: "How can I compare the prices I'm paying to NADAC to see where I might be overpaying?" It's a reasonable request—NADAC (National Average Drug Acquisition Cost) exists to provide transparent pricing benchmarks, and this pharmacy contributes their own purchase data to the system. Surely they should be able to use it for internal analysis, right?

![Comparing Advils to Advils. OK I know Advil probably wouldn't be in a prescription vial, but work with me here…](./image1-comparing-advils.webp)
<!-- truncate -->

The answer revealed a fundamental challenge with NADAC when used for this purpose. To directly compare prices against NADAC, you need to use the exact same total pack size units that NADAC uses for its calculation. Unfortunately, that pack size data is locked behind the paywall and license of a commercial drug information database.

## The pack size problem

Every meaningful drug price comparison requires one critical piece of information: how many units are in each package. Normalizing costs to the lowest unit makes it easy to know the average cost of a drug regardless of whether it comes in a 100 count or 500 count or 1000 count bottle. When a pharmacy pays $100 for a bottle of 100 tablets, calculating the per-unit cost is straightforward. But what about an inhaler? A vial of injectable medication? A colonoscopy prep kit? A unit-dose package?

This is where things get complicated. The National Council for Prescription Drug Programs (NCPDP) has established standards for pharmaceutical billing units—"EA" for each, "ML" for milliliters, and "GM" for grams. These standards provide the framework, but implementing them correctly requires navigating a 30+ page specification document filled with exceptions, edge cases, and industry-specific nuances.

Most organizations don't implement these standards themselves. Instead, they rely on commercial drug databases like FDB (First Databank) or Medispan, which have spent decades building comprehensive implementations of these standards. Pharmacies access these databases through their pharmacy management systems, but the pack size data typically isn't available in a format that allows for easy price comparison analysis.

## The NADAC use case

NADAC itself relies on this commercial database approach. When Myers and Stauffer (the consulting firm that collects NADAC data) receives pricing submissions from pharmacies, they use commercial databases to determine pack sizes and calculate per-unit costs. A pharmacy submits an NDC and the total price paid; the database lookup provides the pack size; division gives the per-unit cost.

This system works well for NADAC's primary purpose: creating reliable, standardized pricing benchmarks. But it creates a practical challenge for the pharmacies that contribute the underlying data. While most pharmacies do use commercial drug databases as part of their pharmacy management systems, this data typically isn't accessible in a format that allows easy price comparison analysis. The pack size information exists somewhere in their software, but pharmacists can't readily extract it to perform their own NADAC comparisons.

The situation is frustrating: pharmacies provide the raw data that creates NADAC, but they still can't easily use NADAC for competitive analysis. If I wanted to help the pharmacy manager, I would have to either pay for a license to a commercial drug database (which costs thousands of dollars per year) or somehow figure out a way to help them extract pack size data from their pharmacy management system and create a report that combines that data with the weekly updates from NADAC.

## Building better infrastructure

Rather than working around these limitations, we should focus on building public infrastructure that serves the entire industry. Here are some potential approaches:

**Enhanced transparency in existing systems:** NADAC could include both "per unit" and "*per package*" pricing in their data exports. This simple addition would allow users to directly compare prices they are paying per package without changing NADAC's core methodology. Unfortunately, this type of change would require governance and approval and could potentially take years.

**Public pack size reference:** An open database that correctly implements NCPDP standards, maintained collaboratively by industry participants and freely accessible to all market participants. This is an area where CodeRx and the surrounding community of pharmacists and pharmacy leaders could help. We've already started [working toward this goal](https://coderxio.substack.com/p/the-elusiveness-of-drug-package-size).

**Industry collaboration:** Working groups focused on standardizing pack size calculations and making them publicly available, similar to how other industries manage reference data. FDA is the first organization that comes to mind to bear responsibility for including total pack size in its NDC Directory. It [has all of the pieces of the puzzle](https://coderxio.substack.com/i/148375593/i-get-it-so-whats-the-problem) to calculate total pack size based on NCPDP standards and could save everyone else a lot of headache by just doing it centrally. Or - perhaps NCPDP could take ownership of publishing NDC to pack size mapping data instead of just publishing guidelines on the topic.

## The path forward

The goal isn't to replace existing commercial databases—they provide valuable services beyond basic pack size calculations. Instead, we should reduce the industry's dependence on proprietary databases for fundamental product information that enables basic price comparisons.

This would benefit everyone: pharmacies could make more informed purchasing decisions, researchers could conduct better analyses, policy makers could better understand market dynamics, and smaller market participants could compete more effectively.

NADAC has succeeded in bringing transparency to pharmaceutical pricing. Now we need to build the public data infrastructure that allows everyone to take full advantage of that transparency. This is not a problem with NADAC—it's an opportunity to build something better for the entire industry.

*What is your experience with pharmaceutical pack size calculations and pricing analysis? Have you run into similar challenges with accessing basic product reference data? I'd love to hear from others navigating these issues.*
