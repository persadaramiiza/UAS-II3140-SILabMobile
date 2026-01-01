# Deployment Guide - SILab Mobile

Panduan untuk deploy aplikasi SILab Mobile ke production.

## Table of Contents
1. [Build APK untuk Android](#build-apk-android)
2. [Build IPA untuk iOS](#build-ipa-ios)
3. [Deploy ke Expo Application Services (EAS)](#deploy-to-eas)
4. [Publish ke Play Store](#publish-to-play-store)
5. [Publish ke App Store](#publish-to-app-store)

---

## Build APK Android

### Method 1: Using Expo EAS Build (Recommended)

#### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

#### 2. Login to Expo
```bash
eas login
```

#### 3. Configure EAS
```bash
eas build:configure
```

Ini akan membuat file `eas.json`.

#### 4. Build APK
```bash
# For development build
eas build --platform android --profile preview

# For production build
eas build --platform android --profile production
```

#### 5. Download APK
Setelah build selesai, download APK dari link yang diberikan.

### Method 2: Using Expo Classic Build

```bash
expo build:android
```

Pilih:
- Build type: APK atau App Bundle
- Keystore: Generate new atau upload existing

---

## Build IPA iOS

### Requirements
- Mac dengan Xcode installed
- Apple Developer Account ($99/year)

### Using EAS Build

#### 1. Configure iOS Build
```bash
eas build:configure
```

#### 2. Build IPA
```bash
# For development
eas build --platform ios --profile preview

# For production
eas build --platform ios --profile production
```

#### 3. Submit to App Store
```bash
eas submit --platform ios
```

---

## Deploy to EAS

### Setup EAS Project

#### 1. Create eas.json
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "autoIncrement": true
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

#### 2. Update app.json
```json
{
  "expo": {
    "name": "SILab Mobile",
    "slug": "silab-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#020617"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.silabmobile"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#020617"
      },
      "package": "com.yourcompany.silabmobile"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

#### 3. Build and Deploy
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both
eas build --platform all
```

---

## Publish to Play Store

### 1. Prepare Assets

#### App Icon
- Size: 512x512 px
- Format: PNG
- No transparency

#### Feature Graphic
- Size: 1024x500 px
- Format: PNG or JPG

#### Screenshots
- Minimal 2, maksimal 8 screenshots
- Recommended: 1080x1920 px (portrait)

### 2. Create Play Store Listing

1. Go to https://play.google.com/console
2. Create app
3. Fill in app details:
   - App name
   - Short description (80 characters)
   - Full description (4000 characters)
   - Screenshots
   - Feature graphic
   - App icon

### 3. Prepare App Release

#### Content Rating
1. Fill out content rating questionnaire
2. Get rating certificate

#### Privacy Policy
Create privacy policy URL (required)

#### App Category
Select appropriate category (Education/Productivity)

### 4. Upload APK/AAB

1. Go to Production > Create new release
2. Upload APK or App Bundle (.aab)
3. Add release notes
4. Review and rollout

### 5. Submit for Review

Submit app for Google review (usually 1-3 days).

---

## Publish to App Store

### 1. Prepare App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Create new app
3. Fill in metadata:
   - App name
   - Subtitle
   - Description
   - Keywords
   - Screenshots (required for all device sizes)
   - App icon

### 2. Screenshots Required Sizes

- 6.5" iPhone (1284 x 2778)
- 5.5" iPhone (1242 x 2208)
- 12.9" iPad Pro (2048 x 2732)

### 3. App Information

- Privacy Policy URL (required)
- Category: Education
- Content Rights
- Age Rating

### 4. Pricing and Availability

- Price: Free or Paid
- Availability: Select countries

### 5. Build and Submit

```bash
# Build iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### 6. App Review

Submit for review (usually 1-2 days).

---

## Environment Variables for Production

### Setup Production Environment

Create `.env.production`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

### Use in Build

```bash
# Load production env
export $(cat .env.production | xargs)

# Build
eas build --platform all
```

---

## Pre-deployment Checklist

- [ ] Test app thoroughly on both Android and iOS
- [ ] Update version number in `app.json`
- [ ] Prepare all required assets (icons, screenshots)
- [ ] Write release notes
- [ ] Update privacy policy
- [ ] Test with production Supabase instance
- [ ] Remove all console.log statements
- [ ] Enable error tracking (Sentry, etc.)
- [ ] Setup analytics (if needed)
- [ ] Prepare app store listings
- [ ] Get legal review (if required)

---

## Post-deployment

### Monitor App Performance

1. Check crash reports
2. Monitor user reviews
3. Track analytics
4. Monitor API usage in Supabase

### Update Strategy

1. Test updates thoroughly
2. Use staged rollouts
3. Monitor crash rates
4. Be ready to rollback if needed

### Versioning

Follow semantic versioning:
- Major: Breaking changes (2.0.0)
- Minor: New features (1.1.0)
- Patch: Bug fixes (1.0.1)

---

## Useful Commands

```bash
# Check build status
eas build:list

# View build logs
eas build:view <build-id>

# Cancel build
eas build:cancel

# Update app (OTA update)
eas update --branch production --message "Bug fixes"

# View submissions
eas submit:list
```

---

## Common Issues

### Build Failed
- Check build logs in EAS
- Verify all dependencies are compatible
- Check for native module issues

### Submission Rejected
- Review rejection reason carefully
- Fix issues and resubmit
- Common issues: privacy policy, screenshots, metadata

### OTA Update Not Working
- Verify update is published
- Check app version compatibility
- Clear app cache and restart

---

## Resources

- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/app-store-connect/)
- [Expo Forums](https://forums.expo.dev/)

---

## Support

For deployment issues:
1. Check Expo documentation
2. Search Expo forums
3. Contact Expo support
4. Consult with team
