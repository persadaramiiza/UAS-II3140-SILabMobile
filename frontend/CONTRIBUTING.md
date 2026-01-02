# Contributing to SILab Suite

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## 🤝 How to Contribute

### Reporting Bugs

1. Check existing issues terlebih dahulu
2. Buat issue baru dengan template:
   ```
   **Bug Description:**
   [Jelaskan bug-nya]
   
   **Steps to Reproduce:**
   1. ...
   2. ...
   
   **Expected Behavior:**
   [Apa yang seharusnya terjadi]
   
   **Actual Behavior:**
   [Apa yang sebenarnya terjadi]
   
   **Screenshots:**
   [Jika ada]
   
   **Environment:**
   - Browser: [Chrome/Firefox/Safari]
   - OS: [Windows/Mac/Linux]
   - Node version: [18.x]
   ```

### Suggesting Features

1. Check roadmap di CHANGELOG.md
2. Buat issue dengan label "enhancement"
3. Jelaskan:
   - Use case
   - Proposed solution
   - Alternatives considered

### Code Contributions

1. **Fork repository**
2. **Create branch:**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-fix
   ```
3. **Make changes** (ikuti coding standards)
4. **Commit:**
   ```bash
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve bug xyz"
   ```
5. **Push:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open Pull Request**

## 📝 Coding Standards

### TypeScript

```typescript
// ✅ DO: Use explicit types
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ DON'T: Use any
function calculate(items: any): any {
  return items.reduce((sum: any, item: any) => sum + item.price, 0);
}
```

### React Components

```typescript
// ✅ DO: Functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn('btn', variant)}>
      {label}
    </button>
  );
}

// ❌ DON'T: Class components (unless necessary)
```

### Styling

```typescript
// ✅ DO: Use Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg">

// ✅ DO: Use cn() for conditional classes
<div className={cn('btn', isActive && 'active', className)}>

// ❌ DON'T: Inline styles (unless dynamic values)
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### File Naming

```
✅ DO:
- UserProfile.tsx          (PascalCase for components)
- useAuth.ts              (camelCase for hooks)
- api-service.ts          (kebab-case for utilities)
- constants.ts            (lowercase for configs)

❌ DON'T:
- userprofile.tsx
- UseAuth.ts
- ApiService.ts
```

### Import Order

```typescript
// 1. React & external libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal libraries & utils
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

// 3. Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. Hooks & contexts
import { useAuth } from '@/contexts/AuthContext';

// 5. Types
import type { User } from '@/lib/supabase';
```

## 🧪 Testing

Before submitting PR:

```bash
# 1. Check TypeScript errors
npm run type-check  # jika ada script

# 2. Build production
npm run build

# 3. Test production build
npm run preview

# 4. Test di browser
# - Check console untuk errors
# - Test all modified features
# - Test on different screen sizes
```

## 📖 Documentation

Update documentation jika:

- ✅ Menambah fitur baru → Update README.md
- ✅ Mengubah setup process → Update SETUP_GUIDE.md
- ✅ Menambah deployment option → Update DEPLOYMENT_GUIDE.md
- ✅ Breaking changes → Update CHANGELOG.md

## 🔀 Git Workflow

### Commit Messages

Format: `<type>: <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update deployment guide"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify auth context"
git commit -m "perf: optimize image loading"
```

### Branch Naming

```
feature/feature-name    # New features
fix/bug-description     # Bug fixes
docs/topic              # Documentation
refactor/what-changed   # Code refactoring
```

### Pull Request Template

```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on multiple browsers

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Fixes #123
```

## 🎨 UI/UX Guidelines

### Design Consistency

- Use existing shadcn/ui components
- Follow Tailwind spacing scale
- Maintain 402px max-width for mobile
- Use Lucide icons only

### Accessibility

```typescript
// ✅ DO: Add aria labels
<button aria-label="Close menu" onClick={close}>
  <X className="w-4 h-4" />
</button>

// ✅ DO: Semantic HTML
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

// ❌ DON'T: Generic divs for everything
<div onClick={navigate}>
  <div>Home</div>
</div>
```

### Responsive Design

```typescript
// ✅ DO: Mobile-first
<div className="p-4 md:p-6 lg:p-8">

// ✅ DO: Test on multiple sizes
// - Mobile: 375px
// - Tablet: 768px
// - Desktop: 1024px+
```

## 🚫 What NOT to Do

- ❌ Don't commit `.env` file
- ❌ Don't commit `node_modules/`
- ❌ Don't use `any` type without good reason
- ❌ Don't skip TypeScript errors
- ❌ Don't add dependencies without discussion
- ❌ Don't commit commented-out code
- ❌ Don't forget to update documentation

## 💬 Communication

- Be respectful and constructive
- Explain your reasoning
- Be open to feedback
- Ask questions if unclear

## 📚 Resources for Contributors

### Learning
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## 🏆 Recognition

Contributors will be added to:
- CHANGELOG.md
- Project README
- GitHub contributors page

## 📞 Questions?

- Open a GitHub Discussion
- Ask in project chat
- Email the team

---

Thank you for contributing to SILab Suite! 🙏

Your contributions make this project better for everyone.
