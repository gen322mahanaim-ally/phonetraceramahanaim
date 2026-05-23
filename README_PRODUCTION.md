# Phone Trace App - Enterprise Telecom Integration

![Production Ready](https://img.shields.io/badge/status-PRODUCTION%20READY-brightgreen)
![Security](https://img.shields.io/badge/security-VERIFIED-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)

A **production-grade phone tracking application** with enterprise telecom backend integration, built for telecommunications carriers and authorized service providers.

## 🌟 Features

### Core Capabilities
- ✅ **IMEI-based Tracking** - Locate devices via International Mobile Equipment Identity
- ✅ **Phone Number Tracking** - Search by MSISDN
- ✅ **Offline Device Tracking** - Last-known location via HLR/HSS
- ✅ **Multi-Adapter Architecture** - HLR/HSS, VLR/MME, CDR, EIR support
- ✅ **Real-time Location Updates** - WebSocket support for live tracking
- ✅ **Location History** - Complete device movement audit trail
- ✅ **Admin Dashboard** - Enterprise management interface

### Security & Compliance
- ✅ **Enterprise Authentication** - JWT with 32+ character secrets
- ✅ **Role-Based Access Control** - Admin, operator, user roles
- ✅ **Audit Logging** - All carrier queries logged and auditable
- ✅ **Rate Limiting** - 100 req/min per IP for DDoS protection
- ✅ **Security Headers** - CSP, HSTS, X-Frame-Options, etc.
- ✅ **Data Encryption** - At-rest and in-transit protection
- ✅ **Input Validation** - Strict IMEI, phone number, coordinate validation
- ✅ **GDPR/CCPA Ready** - Compliance measures implemented

### Telecom Integration
- ✅ **HLR/HSS Integration** - Subscriber lookups via Open-Source-HLR-HSS
- ✅ **VLR/MME Logs** - Location tracking via visited network logs
- ✅ **CDR Access** - Call detail records for subscriber mapping
- ✅ **EIR Queries** - Equipment identity register for device history
- ✅ **MME/SGSN Elasticsearch** - Advanced location event streaming

### Infrastructure & DevOps
- ✅ **Containerized** - Docker & Docker Compose ready
- ✅ **Kubernetes Compatible** - Can run on any K8s cluster
- ✅ **Multi-Platform** - Vercel, AWS, GCP, on-premises
- ✅ **Health Checks** - Automated startup validation & monitoring
- ✅ **CI/CD Ready** - GitHub Actions compatible

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16+, React 19, Tailwind CSS 4, TypeScript |
| **Backend** | Next.js API Routes, Express middleware |
| **Database** | Firebase Firestore, Realtime DB |
| **Authentication** | JWT, Firebase Auth |
| **Telecom** | Open-Source-HLR-HSS, REST adapters |
| **Monitoring** | Sentry, custom audit logging |
| **Containerization** | Docker, Docker Compose |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (v24 tested)
- Firebase Project (free tier available)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd phone-trace-app

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Development

```bash
npm run dev
# App runs at http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Docker

```bash
docker build -t phone-trace-app .
docker run -p 3000:3000 \
  -e JWT_SECRET=$JWT_SECRET \
  -e NEXT_PUBLIC_FIREBASE_PROJECT_ID=$PROJECT_ID \
  phone-trace-app
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [PRODUCTION_READY.md](./PRODUCTION_READY.md) | **START HERE** - Production readiness status |
| [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) | Detailed deployment guide |
| [SECURITY.md](./SECURITY.md) | Comprehensive security guide |
| [SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md) | Security verification checklist |
| [SECURITY_IMPLEMENTATION.md](./SECURITY_IMPLEMENTATION.md) | Implementation details |

## 🔒 Security

### Implemented Controls
- **Authentication**: JWT tokens with 7-day expiration
- **Authorization**: Role-based access control
- **API Security**: Rate limiting, input validation, XSS protection
- **Database**: Firestore security rules, encryption at rest
- **Network**: HTTPS/TLS enforcement, security headers
- **Audit**: Complete carrier query logging
- **Secrets**: Environment-based secret management

### Compliance
- OWASP Top 10 protections
- GDPR Article 32 data protection
- SOC 2 Type II controls
- CWE/SANS coverage
- Telecom carrier standards

## 🛰️ Telecom Adapters

### Supported Data Sources

```
┌─────────────────────────────────────────┐
│         Phone Trace App                 │
│  (Next.js + Firebase + TypeScript)      │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
    ┌───▼──┐   ┌──▼───┐  ┌──▼──┐
    │ HLR/ │   │ VLR/ │  │ CDR │
    │ HSS  │   │ MME  │  │     │
    └──────┘   └──────┘  └─────┘
```

### HLR/HSS (Home Location Register)
- **Purpose**: Subscriber lookup by IMSI/MSISDN
- **Backend**: Open-Source-HLR-HSS
- **Query Types**: By IMEI, By Phone Number
- **Response**: Subscriber profile, location, roaming status

### VLR/MME (Visitor Location Register)
- **Purpose**: Attach/detach events, location history
- **Query Types**: By IMEI, By MSISDN, time-windowed
- **Response**: Location events, attach/detach records

### CDR (Call Detail Records)
- **Purpose**: Call/SMS linking device to phone number
- **Query Types**: By IMEI, By MSISDN
- **Response**: Call records, MSISDN, operator

### EIR (Equipment Identity Register)
- **Purpose**: Device history, last-seen operator
- **Query Types**: By IMEI
- **Response**: Device status, equipment history

## 🔧 Configuration

### Required Environment Variables

```env
# JWT & Security
JWT_SECRET=your_32_char_random_secret_here

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com

# HLR/HSS Integration
HLR_HSS_BASE_URL=http://localhost:8080
HLR_HSS_API_KEY=your_hlr_api_key

# VLR Integration
VLR_BASE_URL=http://localhost:8081
VLR_API_KEY=your_vlr_api_key

# CDR Integration
CDR_BASE_URL=http://localhost:8082
CDR_API_KEY=your_cdr_api_key

# EIR Integration
EIR_BASE_URL=http://localhost:8083
EIR_API_KEY=your_eir_api_key
```

See [.env.local.example](./.env.local.example) for complete configuration.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout (clear tokens)

### Device Tracking
- `POST /api/carrier/lookup` - Query device by IMEI
- `GET /api/device/sim-history` - Get SIM history
- `GET /api/device/location-history` - Location history

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/audit-log` - View audit trail
- `POST /api/admin/rate-limit` - Manage rate limits

### Health
- `GET /api/health` - Health check

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### Security Validation
```bash
npm run validate:security
```

## 📈 Performance

### Benchmarks (from `PRODUCTION_DEPLOYMENT.md`)
- **Throughput**: 100+ requests/sec
- **p95 Latency**: < 500ms
- **p99 Latency**: < 1000ms
- **Error Rate**: < 0.1%

### Optimization Features
- Middleware request handling
- Carrier adapter timeout configuration
- Database query optimization
- Error resilience patterns
- Rate limiting strategy

## 🔄 Deployment Options

### Vercel (Recommended)
```bash
vercel --prod --env-file=.env.production
```
- Auto-scaling
- Global CDN
- Automatic HTTPS

### AWS EC2/ECS
```bash
docker build -t phone-trace-app .
# Push to ECR and deploy via ECS
```

### Google Cloud Run
```bash
gcloud run deploy phone-trace-app --source .
```

### Docker Compose (Local/On-Premises)
```bash
docker-compose up -d
```

See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for detailed instructions.

## 📋 Pre-Deployment Checklist

- [ ] Generate strong JWT_SECRET
- [ ] Configure Firebase project
- [ ] Set up Firestore security rules
- [ ] Configure carrier adapter endpoints
- [ ] Test carrier connectivity
- [ ] Set up monitoring (Sentry/Datadog)
- [ ] Configure HTTPS/TLS
- [ ] Enable DDoS protection
- [ ] Review audit logging
- [ ] Test health checks
- [ ] Load test the system
- [ ] Prepare incident response plan

## 🆘 Support & Issues

### Troubleshooting
1. Check health endpoint: `GET /api/health`
2. Review error logs (Sentry dashboard)
3. Validate environment: `validateEnvironment()`
4. Check carrier adapter connectivity
5. Review audit logs for patterns

### Common Issues
- **Auth Failures**: Verify JWT_SECRET and token expiration
- **High Latency**: Check carrier endpoint response time
- **Rate Limiting**: Implement per-user quotas if needed
- **DB Errors**: Check Firestore rules and connectivity

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

This is a production application for authorized telecom providers. Contributions should follow:
1. Security-first development
2. Complete test coverage
3. Audit logging for all changes
4. Security review before merge

## 📞 Contact

For deployment assistance or security questions:
- Review [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- Check [SECURITY.md](./SECURITY.md)
- Refer to [PRODUCTION_READY.md](./PRODUCTION_READY.md)

---

**Status**: ✅ **PRODUCTION READY**

This application has been thoroughly tested and hardened for production use in telecommunications environments. All security requirements have been implemented and verified.
