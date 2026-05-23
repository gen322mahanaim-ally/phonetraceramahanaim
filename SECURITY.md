# 🔒 Security Guide - Phone Trace App

## Table of Contents
1. [Authentication](#authentication)
2. [API Security](#api-security)
3. [Database Security](#database-security)
4. [Input Validation](#input-validation)
5. [Rate Limiting](#rate-limiting)
6. [Environment Security](#environment-security)
7. [Data Protection](#data-protection)
8. [Security Headers](#security-headers)
9. [Deployment Security](#deployment-security)

---

## Authentication

### JWT Token Security
- **Token Expiration**: 7 days (configurable)
- **Secret Key**: Must be changed in production via `JWT_SECRET` env variable
- **Token Validation**: All API endpoints require valid JWT token in Authorization header

```bash
Authorization: Bearer <your_jwt_token>
```

### Best Practices
✅ Always use HTTPS in production  
✅ Never expose JWT_SECRET in code or version control  
✅ Implement token refresh mechanism for long sessions  
✅ Use HttpOnly cookies for token storage  
✅ Set appropriate token expiration times  

---

## API Security

### Rate Limiting
- **Auth Endpoint**: 10 requests per minute per IP/user
- **Search Endpoint**: 30 requests per minute per IP/user
- **Location Endpoint**: 50 requests per minute (POST), 100 (GET)

Returns HTTP 429 when limit exceeded with `Retry-After` header.

### CORS Policy
- Only same-origin requests allowed by default
- Configure CORS in production for specific domains
- See `middleware.ts` for CORS configuration

### Security Headers
All API responses include:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: restricted
```

---

## Database Security

### Firestore Rules
Located in `firestore.rules` - apply these rules to your Firestore database:

1. **Users Collection**
   - Only authenticated users can read
   - Admins can read all users
   - Users can only modify their own profile

2. **Devices Collection**
   - Authenticated users can read
   - Only admins can create/delete devices
   - Device owners can update their devices

3. **Locations Collection**
   - Authenticated users can read
   - Location data is tied to specific devices
   - Only device owners or admins can modify

4. **Audit Logs**
   - Track all sensitive operations
   - Only admins can access full logs
   - Users see only their own activity

### Setup Instructions
1. Go to Firebase Console
2. Navigate to Firestore Database > Rules
3. Copy contents of `firestore.rules`
4. Click Publish

---

## Input Validation

### Implemented Validations

#### IMEI Validation
```javascript
// Must be exactly 15 digits
validateIMEI('123456789012345') // true
validateIMEI('12345') // false
```

#### Phone Number Validation
```javascript
// International format
validatePhoneNumber('+14155552671') // true
validatePhoneNumber('invalid') // false
```

#### Email Validation
```javascript
validateEmail('user@example.com') // true
validateEmail('invalid.email') // false
```

#### Coordinate Validation
```javascript
// Latitude: -90 to 90
// Longitude: -180 to 180
validateCoordinates(40.7128, -74.0060) // true
validateCoordinates(100, 200) // false
```

### String Sanitization
- Removes potential XSS characters: `<`, `>`, `"`, `'`, `` ` ``
- Limits string length to 255 characters
- Trims whitespace

---

## Rate Limiting

### Configuration
```typescript
rateLimitMiddleware(request, limit, windowMs)
```

- **limit**: Number of requests allowed
- **windowMs**: Time window in milliseconds (default: 60000 = 1 minute)

### Storage
- In-memory storage (auto-cleanup every 10 minutes)
- For production with multiple servers, use Redis

---

## Environment Security

### Required Variables
Create `.env.local` with (never commit to git):

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_url

# Security
JWT_SECRET=change_me_in_production_minimum_32_chars

# Optional
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

### Security Checklist
✅ `.env.local` is in `.gitignore`  
✅ JWT_SECRET is at least 32 characters  
✅ Never commit `.env.local` to version control  
✅ Use different secrets for dev/staging/production  
✅ Rotate secrets regularly  
✅ Store secrets in secure secret manager (AWS Secrets Manager, etc.)  

---

## Data Protection

### Encryption
- TLS/SSL for data in transit (HTTPS)
- Consider end-to-end encryption for sensitive location data
- Never store plaintext passwords

### Data Minimization
- Collect only necessary location data
- Implement data retention policies
- Allow users to delete their data

### Privacy
- Implement proper access controls
- Audit all data access
- Follow GDPR/CCPA compliance requirements
- Clear privacy policy required

---

## Security Headers

### Content-Security-Policy
```
default-src 'self'
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline'
```

### Strict-Transport-Security
```
max-age=31536000; includeSubDomains
```

Enforces HTTPS for one year.

### X-Frame-Options
```
DENY
```

Prevents clickjacking attacks.

---

## Deployment Security

### Pre-Deployment Checklist
- [ ] Change JWT_SECRET to production value (32+ chars)
- [ ] Update Firebase security rules
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CORS for production domain
- [ ] Set up firewall rules
- [ ] Enable Firebase audit logging
- [ ] Configure DDoS protection
- [ ] Set up monitoring and alerts
- [ ] Enable database backups
- [ ] Review all environment variables

### Production Environment
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### Monitoring
- Monitor rate limit triggers
- Alert on failed authentication attempts
- Track API errors
- Monitor database queries
- Set up error tracking (Sentry, etc.)

### Database Backups
- Enable automated Firestore backups
- Test restore procedures
- Store backups securely

---

## Security Incident Response

### If Compromised:
1. Rotate all secrets immediately
2. Review access logs
3. Revoke compromised tokens
4. Update security rules
5. Notify affected users
6. Implement additional security measures
7. Document incident

---

## Legal & Compliance

### GDPR Compliance
- User consent for location tracking
- Data retention policies
- Right to deletion
- Data portability

### CCPA Compliance
- Disclose data collection
- Right to delete
- Right to opt-out

### Regional Laws
- Check local regulations for location tracking
- Comply with telecommunications laws
- Follow privacy regulations

---

## Testing Security

### Manual Testing
```bash
# Test rate limiting
curl -X GET http://localhost:3000/api/device/search?imei=123456789012345 \
  -H "Authorization: Bearer invalid_token"

# Test input validation
curl -X POST http://localhost:3000/api/device/location \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"abc","latitude":999,"longitude":999}'
```

### Automated Testing
- Implement security unit tests
- Use OWASP Top 10 checklist
- Regular penetration testing
- Security scanning tools

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Guide](https://firebase.google.com/docs/rules)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [GDPR Compliance](https://gdpr.eu/)

---

**Last Updated**: May 2026  
**Security Version**: 1.0.0  

> ⚠️ Security is an ongoing process. Review and update these practices regularly.
