# GitHub & Vercel Deployment Guide

## 🚀 Quick Setup (5-10 minutes)

### Step 1: Create GitHub Repository

#### Option A: From Command Line (if git is available)
```bash
cd c:\Users\FOWM\Music\New\ folder\phone-trace-app
git init
git add .
git commit -m "Initial commit: Phone Trace App - Production Ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/phone-trace-app.git
git push -u origin main
```

#### Option B: Via GitHub Web Interface
1. Go to https://github.com/new
2. Repository name: `phone-trace-app`
3. Description: "Enterprise Telecom Phone Tracking Application"
4. Privacy: **Private** (recommended for production)
5. Click "Create repository"
6. Follow GitHub's instructions to push existing code

### Step 2: Protect Main Branch

Go to your repository on GitHub:
1. Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Dismiss stale pull request approvals
   - ✅ Require CODEOWNERS review (recommended)
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date

### Step 3: Connect Vercel

#### Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your GitHub account

#### Import Project to Vercel
1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Find and select `phone-trace-app`
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click "Import"

### Step 4: Set Up Environment Variables on Vercel

On the Vercel project settings page:

1. **Environment Variables**
   - Add all variables from `.env.local.example`:
   - `JWT_SECRET`
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `HLR_HSS_BASE_URL`
   - `HLR_HSS_API_KEY`
   - `VLR_BASE_URL`
   - `VLR_API_KEY`
   - `CDR_BASE_URL`
   - `CDR_API_KEY`
   - `EIR_BASE_URL`
   - `EIR_API_KEY`

2. Select appropriate environment:
   - Production (main branch)
   - Preview (pull requests)
   - Development (if using dev branch)

### Step 5: Configure GitHub Secrets for CI/CD

Go to GitHub repository → Settings → Secrets and variables → Actions

Add these secrets for the automated deployment workflow:

**Vercel Integration:**
```
VERCEL_TOKEN        # Get from Vercel Account Settings → Tokens
VERCEL_ORG_ID       # Get from Vercel team/personal settings
VERCEL_PROJECT_ID   # Get from Vercel project settings
```

**All Environment Variables:**
```
JWT_SECRET
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
HLR_HSS_BASE_URL
HLR_HSS_API_KEY
VLR_BASE_URL
VLR_API_KEY
CDR_BASE_URL
CDR_API_KEY
EIR_BASE_URL
EIR_API_KEY
```

**Optional (for notifications):**
```
SLACK_WEBHOOK       # Slack channel webhook for deployment notifications
SNYK_TOKEN          # Snyk for dependency scanning (optional)
```

---

## 📋 Detailed Steps

### Getting Vercel Credentials

#### 1. VERCEL_TOKEN
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: `GitHub-CI-CD`
4. Scope: Full access
5. Copy the token
6. Add to GitHub secret `VERCEL_TOKEN`

#### 2. VERCEL_ORG_ID & VERCEL_PROJECT_ID
1. Go to your Vercel project page
2. Click "Settings" in the top menu
3. Copy "Project ID"
4. Your Team/Personal ID is shown in the URL or Settings

Or use Vercel CLI:
```bash
npm install -g vercel
vercel link
# This creates .vercel/project.json with IDs
cat .vercel/project.json
```

### Getting Firebase Credentials

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project
3. Click the gear icon → Project Settings
4. Copy values from "Web API Key" section:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Getting Carrier Adapter Credentials

Obtain from your telecommunications provider:
- HLR/HSS endpoint and API key
- VLR endpoint and API key
- CDR endpoint and API key
- EIR endpoint and API key

---

## 🔄 Workflow: Making Changes

### 1. Clone and Create Feature Branch
```bash
git clone https://github.com/YOUR_USERNAME/phone-trace-app.git
cd phone-trace-app
git checkout -b feature/your-feature-name
```

### 2. Make Changes
```bash
# Make code changes
npm run dev
# Test locally
```

### 3. Commit and Push
```bash
git add .
git commit -m "feat: describe your changes"
git push origin feature/your-feature-name
```

### 4. Create Pull Request
- Go to GitHub repository
- Click "Compare & pull request"
- Add description
- Click "Create pull request"
- This triggers:
  - ✅ Code quality checks
  - ✅ Security scanning
  - ✅ Preview deployment to Vercel
  - ✅ Automated tests

### 5. Review & Merge
- Get code review
- Check preview deployment
- Merge PR to main branch
- This triggers:
  - ✅ Production build & test
  - ✅ Security scan
  - ✅ Automatic deployment to production

---

## 🛡️ GitHub Actions Workflows

### Included Workflows

#### 1. `deploy-vercel.yml` (Main Deployment)
**Triggers:** Push to `main` or `master` branch

**Steps:**
1. Checkout code
2. Setup Node.js (test on 18.x and 20.x)
3. Install dependencies
4. Run linting
5. Build application
6. Run tests
7. Deploy to Vercel (production)
8. Verify deployment
9. Send Slack notification

#### 2. `security.yml` (Security Scanning)
**Triggers:** Push to any branch, PR, weekly schedule

**Checks:**
1. Code quality (ESLint, TypeScript)
2. npm audit for vulnerabilities
3. Secret scanning (Trufflehog)
4. Dependency check (Snyk - optional)
5. CodeQL analysis

#### 3. `preview-deploy.yml` (PR Previews)
**Triggers:** Pull request created/updated

**Steps:**
1. Run tests
2. Deploy preview to Vercel
3. Comment on PR with preview URL

---

## 📊 Monitoring Deployments

### Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select project
3. Monitor:
   - Deployment status
   - Build times
   - Function metrics
   - Environment variables

### GitHub Actions
1. Go to GitHub repository
2. Click "Actions" tab
3. See workflow runs:
   - Status (✅ success, ❌ failed)
   - Logs for each step
   - Deployment history

### Check Deployment Status
```bash
# Get latest deployment info
curl https://your-vercel-app.vercel.app/api/health
```

---

## 🔒 Security Best Practices

### 1. Protect Secrets
- Never commit `.env.local`
- Use GitHub Secrets for all credentials
- Rotate tokens regularly
- Use branch protection on `main`

### 2. Code Review
- Require pull requests before merge
- Request code reviews from team members
- Run automated security checks
- Review CodeQL findings

### 3. Monitoring
- Check GitHub Actions logs for failures
- Monitor Vercel deployments
- Set up Slack notifications
- Review security scan results

### 4. Incident Response
If deployment fails:
1. Check GitHub Actions logs
2. Review the failed workflow
3. Fix the issue
4. Create a new PR
5. Deploy again

---

## 🚨 Troubleshooting

### Deployment Fails on GitHub Actions
1. Check the workflow logs:
   - GitHub → Actions → Click failed workflow
   - See which step failed
   - Read the error message

2. Common issues:
   - **Missing environment variables**: Add to GitHub Secrets
   - **Build error**: Test locally with `npm run build`
   - **Test failure**: Check `npm test` output locally
   - **Deployment timeout**: Check Vercel project settings

### Vercel Preview Not Working
1. Check environment variables are set
2. Verify Vercel project settings
3. Check Vercel logs:
   - Vercel dashboard → Deployments → Click deployment → Logs

### Security Scan Failures
1. **npm audit**: Update vulnerable packages
   ```bash
   npm audit fix
   ```
2. **Secret detected**: Remove sensitive data, commit with git
   ```bash
   git rm --cached .env.local
   echo ".env.local" >> .gitignore
   ```

---

## 📈 Next Steps

### 1. Set Up Monitoring
```bash
# Sentry (Error tracking)
npm install @sentry/nextjs
# Add SENTRY_DSN to GitHub Secrets

# Datadog (Application monitoring)
# Set up Datadog agent if needed
```

### 2. Configure Domain
1. On Vercel: Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps
4. Enable HTTPS (automatic)

### 3. Set Up Notifications
1. Create Slack webhook: https://api.slack.com/messaging/webhooks
2. Add `SLACK_WEBHOOK` to GitHub Secrets
3. Deployments will notify Slack

### 4. Regular Maintenance
- Monitor GitHub Actions runs
- Review security scan results weekly
- Update dependencies monthly
- Test deployment process monthly

---

## 📞 Support

### Issues with:
- **GitHub**: Visit https://github.com/contact/login
- **Vercel**: Visit https://vercel.com/support
- **Firebase**: Visit https://firebase.google.com/support

### Documentation:
- GitHub Actions: https://docs.github.com/en/actions
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs

---

## ✅ Verification Checklist

After setup, verify:
- [ ] GitHub repository created and code pushed
- [ ] Vercel project connected to GitHub
- [ ] All environment variables set on Vercel
- [ ] GitHub Secrets configured for CI/CD
- [ ] Workflow files present and enabled
- [ ] Test commit triggers workflows
- [ ] Preview deployment works on PR
- [ ] Production deployment works on merge
- [ ] Health check endpoint accessible
- [ ] Monitor logs for any issues

**Status**: ✅ Ready for continuous deployment!
