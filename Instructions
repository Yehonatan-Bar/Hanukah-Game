You are a senior Phaser 3 game developer. Create a complete, runnable Phaser 3 web game project from scratch and output all necessary files and code.

Goal

Build a lightweight, mobile-friendly 2D top-down “chase & avoid” game:

The player controls a “hero” character.

Enemy “Jewish donuts” (sufganiyot) chase the hero.

The longer the hero avoids getting hit, the higher the score.

On collision with any donut, the game ends and shows final score and a restart option.

The game must run locally and be deployable as a static site on GitHub Pages (no backend/server logic required).


Tech Requirements

Use Phaser 3.

Pure client-side. No database. No server APIs.

Provide a complete repo structure that runs with a simple local dev command.

Must be easy to host on GitHub Pages.

Use a modern setup:

Preferred: Vite + Phaser 3 (fast dev server, easy build).

If you choose no-bundler, still provide an equally clean setup with instructions.


Must work on:

Mobile browser (touch controls)

Desktop browser (keyboard controls)



Gameplay Requirements

Camera view: fixed arena (single screen).

The hero:

Moves smoothly in 8 directions.

Controlled by:

Mobile: on-screen virtual joystick or on-screen d-pad (your choice, but make it feel good).

Desktop: arrow keys + WASD.



Donuts:

Spawn periodically at the edges of the arena.

Each donut actively chases the hero using a simple steering behavior (seek).

Donuts should not all move identically: vary speed slightly.

Increase difficulty over time:

spawn rate increases and/or donut speed increases gradually.



Scoring:

Score increases continuously while alive (time-based scoring).

Display score in UI (top-left).

Optional: add small bonus points for “near misses” (when a donut gets close but doesn’t hit), but keep it simple and performant.


Collision:

If hero hits any donut → game over.

Game over screen shows:

Final score

Best score (stored locally via localStorage)

“Restart” button (touch-friendly)



Game loop must be stable at 60 FPS on typical mobile devices.


Art / Assets Requirements

Do not require external paid assets.

If no images are provided, generate simple placeholder visuals:

Hero: colored circle/rectangle sprite created via Phaser Graphics.

Donuts: donut-like ring using Phaser Graphics (circle outline + inner hole) OR simple sprite approximation.


Use consistent sizes and hitboxes.


UI / UX Requirements

Responsive scaling:

Fit to screen, preserve aspect ratio, no stretching.

Handle orientation changes (portrait/landscape).


Touch controls must be visible and not cover the hero.

Add subtle screen shake or flash on game over (optional).

Add mute toggle (optional), but if you add audio, it must not break autoplay restrictions.


Code Quality Requirements

Use a clean scene structure:

Boot/Preload scene (even if using generated graphics)

MainMenu scene

Game scene

GameOver scene


Use Arcade Physics.

Organize code into modules/classes:

Hero controller

Donut enemy class

Spawner / difficulty manager

UI overlay


Include comments where helpful.

Avoid overengineering. Keep it readable and maintainable.


Deliverables

Produce the full set of files a user would commit to GitHub:

package.json (if using Vite)

vite config if needed

index.html

src/ main JS/TS files

any assets folder (optional)

README.md with:

How to run locally

How to build

How to deploy on GitHub Pages (step-by-step)

Controls (mobile + desktop)



GitHub Pages Deployment Requirement

Make deployment straightforward:

If Vite:

Set correct base path notes for GitHub Pages.

Provide build output instructions.

Provide a recommended GitHub Actions workflow OR clear manual steps.


If no-bundler:

Must be directly hostable via GitHub Pages from the root.



Acceptance Checklist

Your solution is correct only if:

Running locally starts the game with a menu and touch controls on mobile.

Donuts spawn and chase the hero.

Score increases over time while avoiding donuts.

Colliding ends the game and shows final + best score.

Restart works reliably.

The project can be deployed to GitHub Pages as a static site.


Now generate all project files and their full contents. Do not skip code. Do not summarize only—write the actual files.


---

Note: this is the food I'm talking about that is the bed and the hero must avoid it: 
סופגניות: sufganiyot (יחיד: sufganiya)

אפשר גם להגיד פשוט: jelly doughnuts / jelly donuts (במיוחד באמריקאית)


לביבות: latkes

או: potato pancakes


ספינג׳: sfenj (או sfinj)

אפשר גם לתאר: Moroccan doughnuts / Moroccan fritters
