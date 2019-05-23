Password Vault
===

Express API
---
1. `cd` into `PasswordVault` folder and `npm i`.
2. Start API with `node index.js`.


Front-end
---
Depending on how the web interface is brought up will determine the host to navigate to. CORS options include both default ports.

### MAMP Option
This makes more sense since a distribution build has already been built.

1. Start your server (MAMP) and move the 'Password' folder to the server root.
2. Navigate to the Angular build in "docs", `./Password/docs/`.

> The port here will be MAMP's default `8888`, or user-defined port. 
> Web interface is accesible at `http:localhost:8888/Password/docs`.


### Angular Server
If you have the Angular CLI tool installed, then you can serve the SPA directly

1. `cd` into `Password`
2. `npm i`
3. ng serve

> The port in this case will be `4200`, Angular's default.
> Web interface is accessible at `http:localhost:4200`.


Play
---
You are ready to start storing your passwords!
