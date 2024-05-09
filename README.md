# React Developer Test Assignment — Variant Group

Here is my result of working on the test assignment.
Here, I gonna describe some nuances & trade-offs of decisions (& extensions to the task) I made.

## Core stack

### Next.js

Not gonna lie. The main reason why I chose Next.js is that it is currently the most popular option for starting a new React app. Using such a popular framework can benefit in many ways (broad community and support, easy to onboard new devs, etc.) but also might be non-optimal (or even harmful) choice for a particular use-case.

For this particular use case, the right (assumably "right"; no one can know for sure) pick is unclear as there is no "future plan" for such an app. In the current state, Next.js isn't a good pick as Next.js team puts a lot of effort into making Next.js run great on a server; in exchange, it's not always easy to work with local sources of data (e.g., I've used `Result<T>` to simulate "loading" state on the server side where local storage isn't supported). However, it's pretty easy to imagine that all the "local" data sources will be moved to a server in the future of such an app, so the biggest pitfall of using Next.js will go away. But as for now, Vite & TanStack Router to build a pure SPA app would be easy and more efficient.

Also, I've used this small project as a playground for touching things in a real-world-like environment (more on that later). In the context of Next.js, I've played with the app router, server components, and server actions and enjoyed using them! Tho, everything except for server actions doesn't add any value to this project.

### StyleX

I've picked [StyleX](https://stylexjs.com/) as a way to write CSS for two reasons.

First of all, I was curious to try it out. As a result, I like it, but it might be a bit early for real use (however, Meta uses it across Facebook & Instagram, so it seems prod-ready). Two main drawbacks are lacking DX (I had to `rm -rf .next` to clan dev build cache to make styling work, hard to integrate with storybook, so I've dropped it as a result) and lack of tools around it (e.g., more linting rules and postCSS like things to "transpile" modern syntax into more supported one).

But the main benefits that StyleX claims it implements great! It's a perfect combination of the CSS-in-JS approach with strong type safety, atomic CSS (which results in smaller CSS bundles, especially at scale), and compile-time style extractions to achieve better performance. As a result, I like this approach way more than CSS Modules and CSS-in-JS with heavy runtime. But I can not say who is better so far when it comes to things like vanilla-extract.

### [t3.gg](https://create.t3.gg/) to bootstrap the app

It's just a better way to create a new Next.js app. Great defaults for eslint & TS, excellent type-safe way to work with env (and way more things it can bring not relevant for a particular project). Cudos, Theo!

### Data managment

As stated in the requirements, I was limited to client-only things. If that wasn't the case, I'd go with `await getDataFromServer(...)` in server components, as it's the easiest way to handle data loading and works great unless the app requires heavy data manipulation on the client side, which is rare. Again, as the app isn't complex (in fact, it's just add/update/delete to some kind of list), there was no need to use complex store lib, so I've picked `React.useSyncExternalStore` and just a JS variable to hold the state. It performs just fine even with many applications (up to 5000). For persisting data, I've picked local storage as it handles around 5 MB of raw data, which is more than enough for this app as I see it. If that isn't the case, the only other option is to use IndexedDB, which is more challenging but gives way more flexibility to store client-side data.

I'm not considering cookies as storage for applications as they're transferring to the server (so it might be assumed as data leaking and making every request slower because of transferring data) and less capable from the point of amount of data it can store.

Session storage doesn't work for this use case, as data doesn't persist across sessions.

As either cookies/localStorage/IndexDB are treated as "external" sources of data from the point of TS code (e.g., no types), I've used Zod to make sure that data has the correct shape.

## Project structure

- /src
  - /app

App router folder. All the routing, layout, error pages, etc. Plus, the initial CSS file

- /src
  - /ui

Components that aren't bound to any "domain-specific" like `Text` or `Button`

- /src
  - /application

All the components & utils (like store) related to applications (entire app) that do not belong to routing. If there would be one more entity (let's say "resume" there gonna be one more domain folder

- /src
  - /utils

Generic functions that do not belongs to UI or any domain entity

- /src
  - /env.js

Files that defines env variables and splits them into server and client to prevent leaking private keys to JS bundle.

### UI

The UI folder defines all the reusable components and shared CSS tokens, such as colors and spacing, that can be used across the entire app. As mentioned above, I've picked StyleX as a tool to work with CSS, which enforces a few things:

- All reusable tokens have to be defined in `*.stylex.ts` files.
- They have to be imported via relative import, as I haven't managed to make it work with absolute imports
- media queries (same for container queries), for now, can't be shared as "tokens", so I used types to enforce consistent queries

Here comes the first **"I'd change it"** thing. Some text (like "3/5 applications generated" or application letter preview) lacks contrast. That's not ideal from an accessibility point, so in case of a real project I would raise this issue and hopefully, it would end up with text with better contrast

To build more accessible components (like application `<section />` has hidden `h2` header or `Button` with icon only has aria attributes), I take some inspiration from [radix](https://www.radix-ui.com/) and [react-spectrum](https://react-spectrum.adobe.com/).
As required, I didn't use any third party for the things presented in Firgma; however, I used both (again, just a curiosity to check both of them)Radix and React-Spectrum for the modal and switch that extended the app with small touches that would help test it.

## Small touches

### Sync between tabs

As the app is client-only, it would be a shame not to sync data across the apps. Hopefully, local storage (and the events it spawns) will make it easy to implement on a basic level. However, for a better implementation, it would be nice to handle "editing what has already been deleted," "editing what has already been edited in another tab," and a few other cases.

### Dark mode

As the color palate existed, I implemented dark mode (based on the `prefers-color-scheme` media query) to make it comfortable to work on/review the app.

### Setting

You can access the settings modal by pressing alt/option+S (or scroll to the very bottom of the page to reach the settings link).
In there, you can (cookies-based settings to make it accessible in server actions):

- toggle delay simulation (for generating letters out of static template)
- toggle GPT-based application letters
- toggle server error simulation

(local settings):

- toggle using `React. useDeferredValue'for application list
- toggle using `react-window` virtualized grid for applications rendering
  (more on that later)

And a few actions you can perform with local data:

- clear all applications
- generate a specified amount of applications, up to 5000 (values around 4500 exit local storage limits) in blocking/non-blocking ways (more on that later)

Here, you can also find a rotating block that tries to perform up to 120 FPS to see lags while inserting tones of applications depending on the settings you choose.

## Runtime performance

As the app does not specify strict limits for applications and has no pagination, there might be runtime performance issues after some applications count thresholds. The app provides a few ways to eliminate performance issues.

From what I've tested, getting and parsing ~5 MB of raw JSON blob doesn't have any segment performance hit, so I didn't make anything around that.

### Virtualization using `react-window`

The most efficient way to handle a large number of items on the page is virtualization, and it's a great fit for the app as the application card has a fixed height, so the virtualization of such a list is as easy as it can be. Just turn the setting on, and enjoy lag-free on both the first rendering and inserting large amounts of data into the store.

### Batching of adding applications to the store

It's hard to imagine that potential API gonna retutn 5 MB blob of data. More realistically it gonna be loading chunk by chunk to load them all (if happenes at all). To simulate that, you can insert "fake" applications in non-blocking way (100 per chunk, every insertion wrapped into `requestIdleCallback` to let react & browser do their job. In case of virtualized rendering it doesn't make any difference, while in clasic rendering it helps a bit and makes rotating spinner semi-responsive. For production application it would require some tuning & testing to get better result.

### Using `React.useDeferredValue`

TL;DR It doesn't help for this use case ¯\_(ツ)\_/¯

While `React.useDeferredValue` (or transitions) is a good solution for fixing performance issues caused by user inputs, it doesn't make a lot of sense when it comes to receiving big chunks of data for the main part of the app. While it can help a bit for slow devices and non-blocking applications generation, it can't match virtualized rendering any close.

## I would change

### Contrast issues

As mentioned, mockups in Figma don't fully respect high contrast for meaningful text. To make the app more accessible, it would be nice to make the contrast higher where applicable.

### Disabling buttons/inputs

Disabling form controls such as inputs and submit/reset buttons isn't the best practice, and it's preferable to avoid it. As an alternative, it would be better to add "loading" state for inputs and do not disable submit button when form is invalid.
