This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Run the command to install all used packages:

```bash
npm install
```

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Extra information about the application

This is a webshop with products gathered from the ASOS API. They are used for education purposes only and are also stored in a separate firebase database to avoid API costs.
The goal of this application is to showcase Data Learning Model. Upon visiting (clicking) products a modal will appear, this modal acts as the detail page of the item you clicked on. Your product history is getting tracked and based on the last visited product, there will be a top 5 generated that are most similar to your product. To see this top 5 all you have to do is scroll back to the top.
