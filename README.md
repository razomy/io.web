# Razomy Io

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.

### 📦 Product

**razomy io** is a web application designed to handle operational tasks simply.

- **Features:**
    - Convert files into different formats.
    - Edit and adjust images.

- **Design:**
    - **Extensible:** You can extend functionality as needed.
    - **Pluggable:** Built to be pluggable and easy to use.

- **Website:** https://io.razomy.org

## 💻 Development

We use **Nuxt** for development.

### Get started

1. **Install Node.js and Git**
   Ensure you have a recent version of Node installed.

2. **Clone the repository**
   ```shell
   git clone git@github.com:razomy/io.web.git
   cd io.web
   ```

3. **Install dependencies**
   ```shell
   npm install
   ```

4. **Run locally**
   ```shell
   npm run dev
   ```
   The app will start at `http://localhost:3000`

---

### 🤝 Contribution Checklist

We follow systematic architectural rules to keep the system reliable.

**Structure**

- [ ] **Packages:** Maintained in a single layer.
- [ ] **Granularity:** One technical element per file.
- [ ] **Organization:** One domain per folder.
- [ ] **Ordering:**
    - Abstract → Concrete (e.g., `object/car`).
    - Source → Target (e.g., `png/pdf`).

**Naming**

- [ ] **Atomic:** Names must be atomic concepts.
- [ ] **Extendable:** Names are extended via prefixes, suffixes, and other names (composition).
- [ ] **Pluralization:**
    - Singular for single items.
    - Plural (`s`) **only** for group operations.
- [ ] **Casing:**
    - `PascalCase` for types/classes.
    - `camelCase` for vars/functions.
- [ ] **Consistency:** File name matches instance name, property name, and type.
- [ ] **Prefixes:**
    - Use `try` for nullable returns (e.g., `tryGet`).
    - Use `with` for interface extensions.
    - **No** `I` prefix for Interfaces.
- [ ] **Suffixes:** Use `Mut` for mutable types.
- [ ] **Functions:**
    - Follow pattern: `[action][result?]["By"+ arguments?]` (e.g., `get`, `getString`, `getStringByIndex`).
    - Async: No `Async` suffix by default.
    - Conflict: If Sync and Async exist, use `Sync` suffix for the synchronous version.
- [ ] **Abbreviations:** Preferred over full words (e.g., `js` > `javascript`).

**Logic**

- [ ] **Strictness:**
    - Always throw on error (no silent fails).
    - **No input validation** (code assumes valid input; logic responsibility lies with the caller).
    - **No optional execution** (code must be deterministic).
- [ ] **Imports:**
    - External: `@razomy/...`
    - Domain: `./...`
    - Prefer (e.g., `import * as packageName from '@razomy/package.name`) named syntax.
- [ ] **Exports:** Prefer named exports.

**Feature Workflow**

- [ ] **One change per commit:** Describe the reason and the solution.
- [ ] **Identity:** Sign commits with a proper name and a permanent email address (one you plan to keep for years).
- [ ] **Cleanliness:** One change type or one solid feature per merge request.

## 🐳 Deploy

Deployment is handled via **Docker**.

1. **Build the image**
   ```shell
   docker build -t razomy-io-web .
   ```

2. **Run the container**
   ```shell
   docker run -p 3000:3000 razomy-io-web
   ```

