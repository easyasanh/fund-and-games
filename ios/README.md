# Fund and Games iOS

This folder contains a small native iOS wrapper for the static Fund and Games web app.

## Run locally

1. Open `FundAndGames.xcodeproj` in Xcode.
2. Select the `FundAndGames` scheme.
3. Choose an iPhone simulator or a connected device.
4. Press Run.

The Xcode build copies the root `index.html`, `styles.css`, `app.js`, `logo.svg`, and `favicon.svg` files into the app bundle under `Web/`. The Swift app loads `Web/index.html` in a `WKWebView`, so the iOS app stays in sync with the web version.

## Notes

- Saves use WebKit local storage inside the app container.
- The export/import save code feature works for moving progress between the web and iOS versions.
- App Store distribution still needs signing, icons, screenshots, and Apple Developer account setup.
