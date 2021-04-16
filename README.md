This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

The project specially built for [Microsoft Azure Virtual Hackathon 2021](https://discover-ai-with-microsoft.agorize.com/en/challenges/msazurevirtualhack-2021/pages/timeline-and-guidelines?lang=en). Provide innovative solutions in advanced data analytics and AI for a number of booming industries!

## Introduction

Internal environmental quality (IEQ) post occupancy evaluation (POE) can help stakeholders understand the current conditions of the building and their impact on occupant wellbeing and productivity. In this project, we propose the use of technology to collect qualitative and quantitative data. 

As a start, we use Form.io + Azure cosmos DB (MongoDB) as data collector for questionaire and Next.js for the real-time data reporting. 

The following tasks will be part of future development
* Internet of things (IoT) for qualitative IEQ data collection
* Big data collection and processing based on ASHRAE guidelines

## Dependencies

* "@headlessui/react": "^0.3.1",
* "autoprefixer": "^10.2.5",
* "axios": "^0.21.1",
* "chart.js": "^2.9.4",
* "fs": "0.0.1-security",
* "isomorphic-unfetch": "^3.1.0",
* "jquery": "^3.6.0",
* "mongodb": "^3.6.5",
* "next": "^10.0.7",
* "next-auth": "latest",
* "next-connect": "^0.10.1",
* "node-stream-zip": "^1.13.2",
* "path": "^0.12.7",
* "postcss": "^8.2.8",
* "postcss-cli": "^8.3.1",
* "react": "^17.0.1",
* "react-chartjs-2": "^2.11.1",
* "react-dom": "^17.0.1",
* "react-multi-carousel": "^2.6.2",
* "sass": "^1.32.8",
* "sqlite3": "^5.0.2",
* "ssri": ">=8.0.1",
* "swr": "^0.5.4",
* "tailwindcss": "^2.0.4",
* "unfetch": "^4.2.0",
* "xmlhttprequest": "^1.8.0",
* "yarn": "^1.22.10"

## Deploy on Azure

1. Setup the Virtual Machine on Azure using at least Standard B1ms (1 vcpus, 2 GiB memory) size. 
1. Then, SSH to server to configure the environment for [CapROver](https://caprover.com/docs/get-started.html).
1. Connect to a domain and access the Caprover captain dashboard to add new App using Github repository hook.
1. Push to Github when ready.

#### Development and production websites on Azure:

* [staging.sufian.cloud](https://staging.sufian.cloud)
* [sufian.cloud](https://sufian.cloud)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#### Development and production websites on Vercel:

* [nextjs-git-azure-myphpmaster.vercel.app](https://nextjs-git-azure-myphpmaster.vercel.app)
* [vercel.sufian.cloud](https://vercel.sufian.cloud)

## Deploy on Alibaba

Similar steps as in Azure cloud

#### Development and production websites on Alibaba:

* [staging-sufian-cloud.alibaba.sufian.cloud](https://staging-sufian-cloud.alibaba.sufian.cloud/)
* [sufian-cloud.alibaba.sufian.cloud](https://sufian-cloud.alibaba.sufian.cloud/)
