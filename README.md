# Generate a real iOS test build(.ipa) using Expo
```
npx expo export --platform ios
```

# app.json fields explained
```
{
  "expo": {
    "name": "MyWalletApp",
    "slug": "my-wallet-app",
    "version": "1.0.0",                  // App version shown to users
    "ios": {
      "bundleIdentifier": "com.mycompany.walletapp",  // Unique app ID (like a package name)
      "buildNumber": "1",               // iOS internal build version
      "supportsTablet": true
    }
  }
}
````
- ios.bundleIdentifier: A unique reverse-DNS string that identifies your app (e.g. com.yourname.wallet)
- version: User-facing version (1.0.0, 1.1.0, etc.)
- ios.buildNumber: Internal versioning for Apple; must increment with each submission
- slug: Project identifier on expo.dev

# If the iOS build/test installation fails, what could be the reasons?

## 1. Device is not registered / UDID missing
- App won’t install or says "Not eligible for this device."
- Make sure the iPhone’s UDID is added to your Apple developer provisioning profile.

## 2. Incorrect or missing bundleIdentifier
- Build fails or cannot be installed.
- Ensure the bundleIdentifier in app.json matches the one used in Apple Developer account and App Store Connect.

## 3. Provisioning Profile / Certificate Errors
- Build fails during signing step.
- Re-run eas credentials or use eas build --clear-credentials to reset.

# Distribute the test version via TestFlight
## 1. Build the app
```
npx eas build -p ios --profile preview
```
## 2. Wait for the .ipa build to finish
You’ll get a link to download or upload to App Store Connect.

## 3. Upload to App Store Connect
- Automatically done if you use eas build and your Apple credentials are linked
- Or manually via Transporter app (Mac) if you download the .ipa

## 4. Enable TestFlight
- Go to App Store Connect > Your App > TestFlight
- Add internal or external testers
- Apple will review first-time builds before external testers can use it (1–2 days)

## 5. Send invitation to testers
- Add testers via email
- They’ll get an email or link to open the app in the TestFlight app


# Crypto Wallet Apps issues during Apple App store review

## 1. Data Privacy & Security
- You must clearly state how user data (wallets, private keys, etc.) is stored and protected.
- If you store sensitive data (like mnemonics or private keys), it must be securely encrypted (e.g. expo-secure-store).
- Apple rejects apps that don’t meet privacy best practices or collect user data without consent.

## 2. Cryptocurrency Functionality Restrictions
- Apps must not offer crypto trading or exchange without the proper regulatory licenses (like FinCEN in the U.S.).
- Wallet apps are allowed to:
  - Generate wallet addresses
  - Show balances
  - Let users send/receive tokens (non-custodial)

## 3. In-app Purchase Rules
- You cannot sell tokens or NFTs through Apple’s IAP system unless using Apple’s payment system (which is usually not feasible).

## 4. Lack of User Authentication
- Apps handling wallets are expected to use biometrics or PINs to protect access.

# Ensure the app meets Apple’s privacy policy requirements

## Info.plist Configuration (iOS App Permissions)
```
{
  "NSCameraUsageDescription": "We use the camera to scan QR codes for wallet addresses.",
  "NSFaceIDUsageDescription": "Used to secure your wallet using Face ID.",
  "NSUserTrackingUsageDescription": "We do not track users. Required for iOS transparency compliance."
}
```

In app.json for Expo, add under ios.infoPlist
```
"ios": {
  "infoPlist": {
    "NSCameraUsageDescription": "We use the camera to scan QR codes.",
    "NSFaceIDUsageDescription": "Used to secure wallet access via Face ID."
  }
}
```
