---
name: 🤖 AI Code Generation Request
description: Template for requesting AI-generated NestJS code
title: "[AI] Generate: [Component Type] - [Brief Description]"
labels: ["ai-generated", "code-request"]
assignees: []

---

## 📋 Code Generation Request

### **Component Type**
- [ ] Controller
- [ ] Service  
- [ ] Module
- [ ] DTO
- [ ] Entity
- [ ] Guard
- [ ] Interceptor
- [ ] Pipe
- [ ] Filter
- [ ] Middleware
- [ ] Other: _____________

### **Feature Details**
**Feature Name**: 
**Module Name**: 
**Description**: 

### **Requirements**
- [ ] CRUD operations
- [ ] Authentication required
- [ ] Authorization (roles/permissions)
- [ ] Validation
- [ ] Database integration (Prisma)
- [ ] Unit tests
- [ ] E2E tests
- [ ] Documentation
- [ ] Error handling

### **Database Schema** (if applicable)
```sql
-- Paste your schema here or describe the entities
```

### **API Endpoints** (if applicable)
```
GET    /api/resource
POST   /api/resource
GET    /api/resource/:id
PUT    /api/resource/:id
DELETE /api/resource/:id
```

### **Additional Context**
<!-- Provide any additional context, business rules, or special requirements -->

---

## ⚠️ **AI Assistant Checklist**

Before generating code, please ensure:

- [ ] ✅ Reviewed [NESTJS_VERSION_INFO.md](../NESTJS_VERSION_INFO.md)
- [ ] ✅ Followed [AI_CODE_GENERATION_GUIDELINES.md](../AI_CODE_GENERATION_GUIDELINES.md)
- [ ] ✅ Using NestJS v11.0.1+ patterns
- [ ] ✅ TypeScript 5.7.3+ features
- [ ] ✅ Proper error handling
- [ ] ✅ Validation decorators
- [ ] ✅ Modern async/await patterns
- [ ] ✅ Following project structure

---

## 📝 **Generated Code**

<!-- AI Assistant will provide the generated code here -->

### Files Created/Modified:
- [ ] `src/[module]/[module].controller.ts`
- [ ] `src/[module]/[module].service.ts`
- [ ] `src/[module]/[module].module.ts`
- [ ] `src/[module]/dto/create-[entity].dto.ts`
- [ ] `src/[module]/dto/update-[entity].dto.ts`
- [ ] `src/[module]/entities/[entity].entity.ts`
- [ ] `src/[module]/[module].controller.spec.ts`
- [ ] `src/[module]/[module].service.spec.ts`

### Dependencies Added:
- [ ] None required
- [ ] `npm install [package-name]`

### Database Changes:
- [ ] None required  
- [ ] Prisma schema updates
- [ ] Migration required: `npx prisma migrate dev --name [migration-name]`

---

## 🧪 **Testing**

### Commands to run:
```bash
# Unit tests
npm run test

# E2E tests  
npm run test:e2e

# Start development server
npm run start:dev
```

### Test endpoints:
```bash
# Example API calls
curl -X GET http://localhost:3000/api/resource
curl -X POST http://localhost:3000/api/resource -d '{"key": "value"}' -H "Content-Type: application/json"
```

---

## ✅ **Verification**

- [ ] Code compiles without errors
- [ ] Tests pass
- [ ] API endpoints work as expected
- [ ] Validation works correctly
- [ ] Error handling works properly
- [ ] Database operations successful
- [ ] Documentation updated
