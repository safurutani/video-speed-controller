# Video Speed Controller
An Opera add on/browser extension that lets you control the playback speed of videos on any website. Supports custom speeds, includes presets, and remembers your last used speed upon closing the browser.


---

# Features
- Use custom speed values by inputting a number greater than 0.01
- Increase/decrease current speed with buttons (± 0.1 or ± 1.0)
- Automatically applies last used speed on new pages or for new videos loaded
- No trackers, analytics, or external communicaton
- relies on local storage only

---

# Installation (Developer Mode)
1. Download or clone the repository
2. Open opera://extensions/
3. Enable Developer Mode
4. Click Load Unpacked
5. Select the project folder

---

# Scripting
### Content Script (```content.js```)
- Automatically loads stored playback speed on every page
- Applies speed to all videos
- Watches for dynamically added videos
- Listens for messages from the extension's popup for user changing the speed

### Popup (```popup.js```)
- Displays current playback speed
- Lets the user adjust the speed in tenths and whole number increments
- Lets the user input a custom speed
- Saves new speeds to browser storage
- Sends messages to content script to update active videos

---

# Privacy Policy
This extension does not collect, store, or transmit any personal data.

The only data stored is the user's preferred video playback speed, which is
saved locally using the browser's storage API. This data never leaves the user's
device and is not transmitted to any external servers.

The extension does not track browsing behavior, does not use analytics,
and does not access or share user information of any kind.

---

# License
MIT License

Copyright (c) 2025 Sara Furutani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

---

# Support
For issues, bugs, feature requests, or questions:
GitHub Issues: https://github.com/yourusername/yourrepo/issues
