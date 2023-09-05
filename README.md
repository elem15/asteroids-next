

# [ARMAGEDDON 2023](https://asteroidnasa.vercel.app)
________
This application receives data from NASA. You can view data on asteroids approaching Earth starting today. As well as detailed information about all the approaches of specific asteroids to the Earth. The list is loaded dynamically for two days as you scroll.

The application does not use state managers or context on the client. These two days are stored only on server routes.

An interactive game with adding asteroids to the cart saves the data in sessionStorage in the browser. This data will disappear after the tab is closed.

Unfortunately NASA does not allow more than 50 requests per day.
___________
Это приложение получает данные от NASA. Вы можете просмотреть данные об астероидах приближающихся к Земле, начиная с сегодняшнего дня. А также подробную информацию обо всех сближениях конкретных астероидов с Землей. Список подгружается динамически по два дня по мере прокрутки. 

В приложении не используются стейт-менеджеры или Контекст на клиенте. Эти два дня хранятся только на серверных роутах. 

Интерактивная игра с добавлением астероидов в корзину сохраняет данные в sessionStorage в браузере. Эти данные исчезнут после закрытия вкладки.

К сожалению NASA не позволяет делать более 50 запросов в день. 
____________
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
