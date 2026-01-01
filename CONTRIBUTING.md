# Contributing to SILab Mobile

Terima kasih atas minat Anda untuk berkontribusi pada SILab Mobile! Dokumen ini berisi panduan untuk berkontribusi pada project ini.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Project Structure](#project-structure)

## Code of Conduct

- Bersikap profesional dan menghormati semua kontributor
- Berikan feedback yang konstruktif
- Fokus pada kode, bukan pada pribadi
- Terima kritik dengan lapang dada

## Getting Started

### Prerequisites

- Node.js v16+
- npm atau yarn
- Git
- Expo CLI
- Code editor (VS Code recommended)

### Setup Development Environment

1. Fork repository
2. Clone fork Anda:
   ```bash
   git clone https://github.com/your-username/silab-mobile.git
   cd silab-mobile
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-repo/silab-mobile.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Setup `.env` file (lihat `.env.example`)

6. Start development server:
   ```bash
   npm start
   ```

## Development Workflow

### 1. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or for bug fix
git checkout -b fix/bug-description
```

Branch naming convention:
- `feature/` - untuk fitur baru
- `fix/` - untuk bug fixes
- `refactor/` - untuk refactoring
- `docs/` - untuk dokumentasi
- `test/` - untuk testing

### 2. Make Changes

- Tulis kode yang clean dan readable
- Ikuti coding standards (lihat di bawah)
- Test perubahan Anda
- Update dokumentasi jika perlu

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add user profile editing feature"
```

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template
5. Submit PR

## Coding Standards

### JavaScript/React Native

#### General Rules

```javascript
// ✅ Good
const fetchUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ❌ Bad
const fetchUserData = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
};
```

#### Component Structure

```javascript
// ✅ Good
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchData } from '../services/api';

export default function MyComponent({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, [userId]);
  
  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchData(userId);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <Text>Loading...</Text>;
  
  return (
    <View style={styles.container}>
      <Text>{data?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

#### Naming Conventions

- **Components**: PascalCase (`UserProfile.js`)
- **Functions**: camelCase (`fetchUserData`)
- **Constants**: UPPER_CASE (`API_URL`)
- **Files**: camelCase or PascalCase
- **Folders**: lowercase or camelCase

#### Best Practices

1. **Use functional components** with hooks
2. **Destructure props** for better readability
3. **Use async/await** instead of promises
4. **Handle errors** properly
5. **Add loading states** for async operations
6. **Use constants** for repeated values
7. **Extract reusable logic** into custom hooks
8. **Keep components small** and focused

### Styling

```javascript
// ✅ Good - Use StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#facc15',
  },
});

// ❌ Bad - Inline styles everywhere
<View style={{ flex: 1, backgroundColor: '#020617', padding: 16 }}>
```

Use constants from `src/utils/constants.js`:
```javascript
import { COLORS, SPACING, FONT_SIZES } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.primary,
  },
});
```

## Commit Guidelines

Gunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Dokumentasi
- `style`: Formatting, missing semicolons, etc
- `refactor`: Refactoring kode
- `test`: Menambah testing
- `chore`: Maintenance

### Examples

```bash
# Feature
git commit -m "feat(auth): add login with google"

# Bug fix
git commit -m "fix(quiz): correct answer validation logic"

# Documentation
git commit -m "docs: update README with setup instructions"

# Refactoring
git commit -m "refactor(api): simplify error handling in assignments API"

# Style
git commit -m "style(components): format EmptyState component"
```

## Pull Request Process

### PR Title

Gunakan format yang sama dengan commit messages:
```
feat(auth): add biometric authentication
```

### PR Description Template

```markdown
## Description
Jelaskan perubahan yang Anda buat

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Jelaskan bagaimana Anda test perubahan ini

## Screenshots (if applicable)
Tambahkan screenshots untuk UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

### Review Process

1. At least one approval required
2. All checks must pass
3. No merge conflicts
4. Code review feedback addressed

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── EmptyState.js
│   ├── ErrorState.js
│   └── LoadingScreen.js
├── contexts/        # React Context providers
│   └── AuthContext.js
├── navigation/      # Navigation configuration
│   └── AppNavigator.js
├── screens/         # Screen components
│   ├── Auth/
│   ├── Main/
│   ├── Announcements/
│   ├── Assignments/
│   ├── Modules/
│   └── Quiz/
├── services/        # API services
│   ├── supabase.js
│   ├── announcementsApi.js
│   ├── assignmentsApi.js
│   └── quizApi.js
└── utils/          # Utility functions
    ├── constants.js
    └── helpers.js
```

### Adding New Features

#### 1. Add API Service (if needed)

Create in `src/services/`:
```javascript
// src/services/newFeatureApi.js
import { supabase } from './supabase';

export async function fetchItems() {
  const { data, error } = await supabase
    .from('items')
    .select('*');
  
  if (error) throw error;
  return data;
}
```

#### 2. Create Screen Component

Create in appropriate `src/screens/` folder:
```javascript
// src/screens/NewFeature/ItemListScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { fetchItems } from '../../services/newFeatureApi';

export default function ItemListScreen() {
  // Component logic
}
```

#### 3. Add Navigation

Update `src/navigation/AppNavigator.js`:
```javascript
import ItemListScreen from '../screens/NewFeature/ItemListScreen';

// Add to navigator
<Stack.Screen name="ItemList" component={ItemListScreen} />
```

#### 4. Update Documentation

- Update README.md
- Add to DATABASE_SCHEMA.md if needed
- Update SETUP_GUIDE.md if needed

## Questions?

Jika ada pertanyaan:
1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Create new issue

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Terima kasih telah berkontribusi! 🎉
