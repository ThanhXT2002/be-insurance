# 🤖 AI Assistant Quick Reference

## 📋 **Before Generating Code - MANDATORY CHECKLIST**

### 1. **Version Check** ✅
- [ ] Read [NESTJS_VERSION_INFO.md](./NESTJS_VERSION_INFO.md)
- [ ] Verify using NestJS v11.0.1+ patterns
- [ ] Confirm TypeScript 5.7.3+ compatibility

### 2. **Guidelines Review** ✅  
- [ ] Follow [AI_CODE_GENERATION_GUIDELINES.md](./AI_CODE_GENERATION_GUIDELINES.md)
- [ ] Use correct import paths
- [ ] Implement proper error handling

---

## 🎯 **Quick Templates**

### **Generate Resource Command**
```bash
nest g resource [name]
# Choose: REST API
# Choose: Yes (CRUD entry points)
```

### **Generate Individual Components**
```bash
nest g controller [name]
nest g service [name]  
nest g module [name]
nest g guard [name]
nest g interceptor [name]
nest g pipe [name]
```

---

## 📦 **Current Project Stack**

| Component | Version |
|-----------|---------|
| NestJS | v11.0.1 |
| TypeScript | v5.7.3 |
| Node.js | v18+ recommended |
| Prisma | v6.13.0 |
| Jest | v30.0.0 |

---

## 🚨 **Common Pitfalls to Avoid**

### ❌ **DON'T USE** (Outdated)
```typescript
// Old v10 patterns
import { HttpModule } from '@nestjs/common'; // ❌
```

### ✅ **USE** (v11 Correct)
```typescript
// New v11 patterns  
import { HttpModule } from '@nestjs/axios'; // ✅
```

---

## 🔧 **Database Integration (Prisma)**

### **Quick Setup**
```bash
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
```

### **Service Pattern**
```typescript
constructor(private prisma: PrismaService) {}
```

---

## 🧪 **Testing Commands**

```bash
npm run test              # Unit tests
npm run test:watch        # Watch mode
npm run test:cov          # Coverage
npm run test:e2e          # E2E tests
```

---

## 🚀 **Development Commands**

```bash
npm run start:dev         # Development with hot reload
npm run build             # Build for production
npm run start:prod        # Run production build
```

---

## 📞 **Need Help?**

1. Check existing documentation files in `.github/`
2. Review NestJS v11 official docs
3. Ensure all patterns follow current best practices

---

**Last Updated**: January 2025 | **Project**: be-insurance
"Hãy check file .github/NESTJS_VERSION_INFO.md và .github/AI_CODE_GENERATION_GUIDELINES.md và .github/copilot-instructions trước khi generate code"