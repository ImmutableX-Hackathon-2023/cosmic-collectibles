<p align="center">
  <h1 align="center">Galaxy-Quest! 🛸</h1>
  <p align="center">
    A game built with Phaser.JS!
   <br />
    <a href="https://kisokumar.github.io/galaxy-quest/" target="_blank">Play It!</a>
    .
    <a href="https://github.com/Kisokumar/galaxy-quest/issues">Report Bug</a>
    ·
    <a href="https://github.com/Kisokumar/galaxy-quest/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">  🚀 About
 </h2></summary>

<p>  Collect stars for fuel and ammo, shoot the meteors and avoid getting hit by them.</p>

<div align="center">

![](https://github.com/Kisokumar/galaxy-quest/blob/main/demo.gif)

</div>
</details>

<details open="open">
  <summary><h2 style="display: inline-block"> 📝 Features
 </h2></summary>

This is the server-side part of the game cosmic collectibles.

- [x] Transition to React

- [x] Transition to Tailwind CSS

- [x] FreePlay Mode

- [ ] Two Player Mode

- [x] Contextual game over scene (messages of how you died/ won)

- [ ] Create components(volume slider, controls page, banner)

- [x] Code seperation & OOP ( easier to build two player mode and other game features )

- [x] Use localStorage to keep track of users highest score and update it live

- [x] Use localStorage to keep track of users mute sound preference

- [x] Game Music and SFX for all scenes & events

- [x] Shoot Lasers & destroy meteors

- [x] Single Player Mode

</details>



<details open="open">
  <summary><h2 style="display: inline-block"> ⚙️ Installation </h2></summary>

Make sure you have `node`, `git` and `npm` installed before beginning.

> 📜 Install Dependencies:

```
cd cosmic-collectibles-client

npm i
```

</details>

---

<details open="open">
  <summary><h2 style="display: inline-block"> 💻 Usage (devserver & deployment)
</h2></summary>

Make sure you have completed installation in the section above.

> 📜 Run a devserver :

```
npm run dev
```
> 📜 Build locally & preview:
```
npm run build
npm run preview
```


> 📜 Script to build & deploy (github pages):

```
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:username/repo.git main:gh-pages

cd -

```
> Source for the script above: [Vite Docs](https://vitejs.dev/guide/static-deploy.html)
</details>
